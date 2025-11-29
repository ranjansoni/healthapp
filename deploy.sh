#!/bin/bash
set -e

echo "🚀 Starting Diet Plan deployment..."

# Configuration
LOCAL_PATH="/Users/ranjansoni/Projects/AI Projects/Diet Plan"
SERVER_USER="ubuntu"
SERVER_DOMAIN="health.ranjansoni.com"
SERVER_IP=""  # Will be resolved from domain, or set manually if needed
SERVER_PATH="/home/ubuntu/dietplan"
KEY_FILE="pulsekey.pem"
TARBALL="dietplan-deploy.tar.gz"
FIRST_DEPLOY="${1:-false}"  # Pass 'first' as argument for first deployment

# Resolve server IP from domain if not set
if [ -z "$SERVER_IP" ]; then
    SERVER_IP=$(dig +short $SERVER_DOMAIN | tail -n1)
    echo "📡 Resolved $SERVER_DOMAIN to $SERVER_IP"
fi

cd "$LOCAL_PATH"

# Build tarball
echo "📦 Creating deployment package..."
if [ "$FIRST_DEPLOY" = "first" ]; then
    echo "   Including .env.local for first deployment..."
    tar --exclude='node_modules' \
        --exclude='.next' \
        --exclude='.turbo' \
        --exclude='.git' \
        --exclude='*.log' \
        --exclude='.DS_Store' \
        --exclude='._*' \
        -czf $TARBALL .
else
    echo "   Excluding .env files (normal deployment)..."
    tar --exclude='node_modules' \
        --exclude='.next' \
        --exclude='.env*' \
        --exclude='.turbo' \
        --exclude='.git' \
        --exclude='*.log' \
        --exclude='.DS_Store' \
        --exclude='._*' \
        -czf $TARBALL .
fi

# Upload
echo "⬆️  Uploading to server..."
scp -i $KEY_FILE $TARBALL $SERVER_USER@$SERVER_IP:$SERVER_PATH/

# Deploy on server
echo "🔧 Deploying on server..."
ssh -i $KEY_FILE $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /home/ubuntu/dietplan

# Backup existing deployment
if [ -d "app" ]; then
    echo "📋 Creating backup..."
    rm -rf app_backup
    cp -r app app_backup 2>/dev/null || true
fi

# Extract new deployment
echo "📂 Extracting files..."
mkdir -p /tmp/dietplan_deploy
tar --no-same-owner -xzf dietplan-deploy.tar.gz -C /tmp/dietplan_deploy/
rm -rf app
mv /tmp/dietplan_deploy app
cd /home/ubuntu/dietplan

# Permissions
sudo chown -R ubuntu:ubuntu app
find app -name '._*' -delete
find app -name '.DS_Store' -delete

# Check for .env file
cd app
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found!"
    echo "   For first deployment, run: ./deploy.sh first"
    echo "   Then update .env.local on the server with production values"
    if [ ! -f "../.env.local" ]; then
        echo "❌ No .env.local file found in parent directory either!"
        exit 1
    fi
    echo "   Copying .env.local from parent directory..."
    cp ../.env.local .
fi

# Verify .env has required variables
if ! grep -q "DATABASE_URL" .env.local; then
    echo "❌ DATABASE_URL missing in .env.local!"
    echo "   Please update .env.local with:"
    echo "   DATABASE_URL=mysql://admin:Demo\$%23123@bennett-websites.cpwtalwthzlk.us-east-1.rds.amazonaws.com:3306/dietplan"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install || {
    echo "❌ npm install failed!"
    exit 1
}

echo "🗄️  Generating Prisma client..."
npx prisma generate || {
    echo "❌ Prisma generate failed!"
    exit 1
}

echo "🔄 Pushing database schema..."
# Use db push instead of migrate for development/production sync
npx prisma db push --accept-data-loss || {
    echo "❌ Database schema push failed!"
    exit 1
}

echo "🏗️  Building application..."
npm run build || {
    echo "❌ Build failed!"
    exit 1
}

# Verify build
if [ ! -d ".next" ]; then
    echo "❌ Build failed - .next directory not created!"
    exit 1
fi

# Restart with PM2
echo "🔄 Restarting application..."
PORT=3301 pm2 restart dietplan || PORT=3301 pm2 start npm --name "dietplan" -- start
pm2 save

# Cleanup
cd /home/ubuntu/dietplan
rm dietplan-deploy.tar.gz

echo "✅ Deployment complete!"
pm2 status
ENDSSH

# Cleanup local
rm $TARBALL

echo ""
echo "🎉 Done! Your Diet Plan app is deployed!"
echo ""
echo "📊 Useful commands:"
echo "   View logs:    ssh -i $KEY_FILE $SERVER_USER@$SERVER_IP 'pm2 logs dietplan --lines 50'"
echo "   Check status: ssh -i $KEY_FILE $SERVER_USER@$SERVER_IP 'pm2 status'"
echo "   Restart app:  ssh -i $KEY_FILE $SERVER_USER@$SERVER_IP 'pm2 restart dietplan'"
echo ""
echo "🌐 Your app is running on port 3301"
echo "   Direct access: http://$SERVER_IP:3301"
echo "   Domain access: https://$SERVER_DOMAIN (via nginx reverse proxy)"
echo ""
echo "⚠️  Note: Make sure nginx is configured to proxy https://$SERVER_DOMAIN to port 3301"
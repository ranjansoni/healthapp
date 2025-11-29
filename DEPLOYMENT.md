# Diet Plan Deployment Guide

## Prerequisites

1. **Server Setup**
   - Ubuntu server with Node.js installed
   - PM2 installed globally: `npm install -g pm2`
   - SSH access with key file

2. **Local Setup**
   - The script is already configured for `health.ranjansoni.com`
   - Server IP will be auto-resolved from the domain
   - Using `pulsekey.pem` for SSH access

## Server Configuration

The deployment is configured for:
- **Domain**: https://health.ranjansoni.com
- **Server Path**: /home/ubuntu/dietplan
- **Application Port**: 3301
- **PM2 Process Name**: dietplan

> **Note**: The domain uses HTTPS via nginx reverse proxy. Make sure nginx is configured to proxy requests from https://health.ranjansoni.com to http://localhost:3301

### Nginx Setup (if not already configured)

If nginx is not yet configured for the domain, see `nginx.conf.template` for a complete configuration. Quick setup:

```bash
# On the server
sudo nano /etc/nginx/sites-available/dietplan
# Paste the configuration from nginx.conf.template
sudo ln -s /etc/nginx/sites-available/dietplan /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## First Time Deployment

MYSQL_URI="mysql://admin:Demo$%23123@bennett-websites.cpwtalwthzlk.us-east-1.rds.amazonaws.com:3306/dietplan"

### Step 2: Create server directory
SSH into your server and create the directory:
```bash
ssh -i pulsekey.pem ubuntu@health.ranjansoni.com
mkdir -p /home/ubuntu/dietplan
exit
```

### Step 3: Run first deployment
This will include the .env.local file:
```bash
./deploy.sh first
```

### Step 4: Update .env.local on server
SSH to the server and update the environment file:
```bash
ssh -i pulsekey.pem ubuntu@health.ranjansoni.com
cd /home/ubuntu/dietplan/app
nano .env.local
```

Update with production values:
```env
DATABASE_URL="mysql://admin:Demo$%23123@bennett-websites.cpwtalwthzlk.us-east-1.rds.amazonaws.com:3306/dietplan"
MYSQL_URI="mysql://admin:Demo$%23123@bennett-websites.cpwtalwthzlk.us-east-1.rds.amazonaws.com:3306/dietplan"
```

Save and exit (Ctrl+X, Y, Enter)

### Step 5: Redeploy
Run deployment again (this time it will use the server's .env.local):
```bash
./deploy.sh
```

## Subsequent Deployments

After the first deployment, simply run:
```bash
./deploy.sh
```

This will:
1. Create a tarball excluding .env files
2. Upload to server
3. Extract and install dependencies
4. Generate Prisma client
5. Push database schema changes
6. Build the application
7. Restart with PM2

## Useful Commands

### View Application Logs
```bash
ssh -i pulsekey.pem ubuntu@YOUR_SERVER_IP 'pm2 logs dietplan --lines 50'
```

### Check Application Status
```bash
ssh -i pulsekey.pem ubuntu@YOUR_SERVER_IP 'pm2 status'
```

### Restart Application
```bash
ssh -i pulsekey.pem ubuntu@YOUR_SERVER_IP 'pm2 restart dietplan'
```

### SSH to Server
```bash
ssh -i pulsekey.pem ubuntu@YOUR_SERVER_IP
```

### View Build Output
```bash
ssh -i pulsekey.pem ubuntu@YOUR_SERVER_IP 'cd /home/ubuntu/dietplan/app && ls -la .next'
```

## Troubleshooting

### Build Fails
1. Check logs: `pm2 logs dietplan`
2. Verify .env.local has DATABASE_URL
3. Check Node.js version on server: `node --version` (should be 18+)

### Database Connection Issues
1. Verify DATABASE_URL is correct in .env.local
2. Check RDS security group allows connections from server IP
3. Test connection: `npx prisma db pull`

### Application Not Starting
1. Check PM2 status: `pm2 status`
2. View error logs: `pm2 logs dietplan --err`
3. Restart manually: `pm2 restart dietplan`

### Port Already in Use
If port 3003 is in use, update the PORT in deploy.sh:
```bash
PORT=3004 pm2 restart dietplan || PORT=3004 pm2 start npm --name "dietplan" -- start
```

## Access Your Application

After successful deployment, access your app at:
```
https://health.ranjansoni.com
```

Or directly via IP (without SSL):
```
http://3.222.84.196:3301
```

## Rollback

If deployment fails, the previous version is backed up:
```bash
ssh -i pulsekey.pem ubuntu@YOUR_SERVER_IP
cd /home/ubuntu/dietplan
rm -rf app
mv app_backup app
pm2 restart dietplan
```

## Database Migrations

The deployment script uses `prisma db push` which:
- Syncs your schema with the database
- Creates tables if they don't exist
- Adds new columns automatically

For production migrations with data safety:
```bash
ssh -i pulsekey.pem ubuntu@YOUR_SERVER_IP
cd /home/ubuntu/dietplan/app
npx prisma migrate deploy
```

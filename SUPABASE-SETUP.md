# Supabase Configuration for Entelech Platform

## Email Confirmation Setup

To fix the 404 error when clicking email confirmation links, you need to configure Supabase with the correct redirect URLs.

### Step 1: Configure Site URL in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Authentication** → **URL Configuration**
4. Set the **Site URL** to your Vercel deployment URL:
   - Example: `https://your-app.vercel.app`
   - Or your custom domain: `https://yourdomain.com`

### Step 2: Add Redirect URLs

In the same **URL Configuration** section, add these to **Redirect URLs**:

```
https://your-app.vercel.app/auth/callback
https://your-app.vercel.app/*
http://localhost:3000/auth/callback (for local development)
```

### Step 3: Update Email Template (Optional)

1. Go to **Authentication** → **Email Templates**
2. Select **Confirm signup** template
3. Make sure the confirmation link uses:
   ```
   {{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email
   ```

   Or if using the new PKCE flow:
   ```
   {{ .ConfirmationURL }}
   ```

### Step 4: Verify Environment Variables in Vercel

Make sure these are set in Vercel → Settings → Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)

### Step 5: Redeploy

After making changes in Supabase:
1. Redeploy your Vercel app (or push a new commit)
2. Test the signup flow again

## Testing the Flow

1. Sign up with a new email
2. Check your email for the confirmation link
3. Click the link - it should redirect to `/auth/callback`
4. The callback route will verify the token and redirect to `/auth?confirmed=true`
5. You'll see a success message and can then log in

## Troubleshooting

### Still getting 404?
- Check that the callback route exists at `/app/auth/callback/route.ts`
- Verify the Site URL in Supabase matches your Vercel URL
- Check Vercel logs for any errors during the callback

### Token verification fails?
- Make sure the email template uses the correct URL format
- Verify environment variables are set correctly
- Check Supabase logs for authentication errors

### Redirect loop?
- Clear browser cookies
- Verify the Site URL doesn't have a trailing slash
- Check that redirect URLs are correctly configured


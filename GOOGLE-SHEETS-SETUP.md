# Google Sheets Integration Setup

## RevOps Leads Spreadsheet Configuration

Your Google Sheets integration is configured to use:
- **Spreadsheet ID**: `1mivnXalbpqnFyczpiWXy5KKB8oxCjyPrgn_t1OIZte4`
- **Sheet Name**: `RevOps Leads`
- **URL**: https://docs.google.com/spreadsheets/d/1mivnXalbpqnFyczpiWXy5KKB8oxCjyPrgn_t1OIZte4/edit

## Environment Variables (Vercel)

Set these in your Vercel project settings:

```
GOOGLE_SHEETS_SPREADSHEET_ID=1mivnXalbpqnFyczpiWXy5KKB8oxCjyPrgn_t1OIZte4
GOOGLE_SHEETS_SHEET_NAME=RevOps Leads
```

Optional (for private sheets or better security):
```
GOOGLE_SHEETS_API_KEY=your-api-key-here
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Sheet Headers

The platform will automatically append rows with the following columns (in order):
- **Audit Requests**: Timestamp, Audit Level, Company Name, Contact Name, Email, Phone, Industry, Company Size, Revenue, Status, Audit Request ID
- **Proposals**: Timestamp, Type, Company Name, Industry, Revenue, Status
- **SOWs**: Timestamp, Type, Project Name, Client Name, Budget, Status

## Access Permissions

For the integration to work, the Google Sheet needs to be:
1. **Public**: Shared with "Anyone with the link can edit" (uses API key if provided)
2. **OR Private**: Use service account credentials (client email + private key)

If using a service account:
1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Extract the `client_email` and `private_key` values
4. Share the Google Sheet with the service account email (as Editor)
5. Set the environment variables above

## Testing

After setting environment variables:
1. Go to `/integrations` in the platform
2. Click "Configure" on Google Sheets
3. Verify the spreadsheet ID is pre-filled
4. Test by generating a proposal or submitting an audit request
5. Check the Google Sheet to confirm data was added



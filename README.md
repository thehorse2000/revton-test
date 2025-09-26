# Revton Test

Custom theme: app/design/frontend/Revton/Amr
Custom module: app/code/Revton/Amr

## Changes Made
- Sticky Top Nav Menu on Desktop.
- Proper Multi-level Menu Navigation on Mobile as requested.
- Converted Messages into Popups (such as add to cart success message).
- Phone number field is required in checkout.
- Added Hard-coded read-only country code field as a prefix to phone number, its value is saved to the phone number after placing the order.

## Some Notes:
- I suggest importing DB from local.sql for local testing. Don't forget to change base_url after importing.
- For Header Menu, I used Snowdog Menu[https://github.com/SnowdogApps/magento2-menu]
- I styled only the mobile navigation as requested, but didn't style the desktop menu properly due to time constraints.
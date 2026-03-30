Overall page goal

This page is for managing website orders in a handmade store dashboard. It should feel clean, practical, and easy to scan. The main focus is a large orders table with powerful filtering, search, sorting, selection, editing, status updates, and deletion actions.

Layout structure

Keep the same dashboard shell as the Overview page:

left fixed sidebar navigation
top header area with global search bar, notification icon, and profile avatar
main content area inside a rounded light card container

Inside the main content area, create this structure from top to bottom:

1. Page header

At the top of the content area:

page title: Orders
short subtitle: Track, filter, update, and manage customer orders
on the right side add a primary button: Add Order

Optional secondary button near it:

Export

The page header should align with the visual language of the Overview page.

2. Controls row

Directly below the page header, add a horizontal controls bar.

Include:

a small table search input on the left with placeholder: Search orders, customers, cities...
a Filter button that opens a dropdown panel
a Sort dropdown
a Bulk Actions dropdown, initially disabled until rows are selected
keep Add Order visible on the right if not already in the page header

This controls row should be compact and functional.

Filter dropdown content

The filter dropdown should open a clean panel containing the following sections:

Price range filter

Include:

a dual range slider
two number inputs:
Min price
Max price

This allows both quick adjustment and precise manual input.

Status filter

Use checkboxes, not radio buttons, because the user may want to filter by more than one status at once.

Statuses:

Pending
Completed
Canceled

Style them as clean checkbox rows or soft chips with checkbox behavior.

Date range filter

Include:

start date picker
end date picker

Optional quick presets:

Today
Last 7 Days
This Month
Filter footer actions

At the bottom of the filter panel:

Apply Filters
Reset
Sorting functionality

The Sort dropdown should include:

Newest first
Oldest first
Price: Low to High
Price: High to Low
Customer Name: A–Z
Customer Name: Z–A

Default sorting:

Newest first
Orders table

The table is the main section of the page. Place it inside a large rounded white card with soft shadow or subtle border.

Table columns

Include these columns in this order:

selection checkbox
Order ID
Products
Customer Name
Price
Date
Status
Address
City
Actions
Column behavior details
Selection checkbox
checkbox per row
select all checkbox in table header
selecting rows enables bulk actions
Order ID
format like #BR-1092
clickable if needed
Products

Show:

first 1 or 2 product names
if more products exist, show text like +2 more
optionally show tiny thumbnail stack, but keep it subtle
Customer Name

Show the name only in the table.
Additional details like phone or email should appear in view/edit interfaces, not inside the table.

Price

Display total order amount in EGP format:

EGP 1,240
Date

Readable format:

24 Mar 2026
Status

Statuses:

Pending
Completed
Canceled

Display them as soft colored status chips:

Pending = muted warm yellow
Completed = muted soft green
Canceled = muted dusty red or rose

The status chip should be inline editable:

clicking the chip opens a small dropdown menu
user can change status directly from:
Pending
Completed
Canceled

This is important because orders arrive from the website as Pending, and the admin later updates them after delivery or cancellation.

Address

Show shortened address in the table to avoid visual clutter, for example:

12 Salah Salem St...
City

Show city separately:

Alexandria
Cairo
Giza
Actions

Use a 3-dot menu per row with these actions:

View
Edit
Delete

Do not add “Change Status” here because status should be changed inline from the Status column.

View action

The View action should open a side drawer from the right.

This drawer is read-only and should show full order details without edit mode.

View drawer content

Include:

Order ID
Date
Status
Customer name
Phone number
Email if available
Full address
City
Ordered products list
Quantity per product
Price per product if desired
Order total
Notes if available

At the bottom of the drawer include actions:

Close
Edit Order

Do not include any timeline section.

Edit action

The Edit action should open a form interface for updating order information.

Best behavior:

open in a side drawer or large modal
prefilled with current order data
Editable fields

Allow editing:

products
customer name
phone number
email
address
city
status
date if needed
notes if available

For products:

allow adding products
removing products
changing quantities

Include:

searchable product selector
quantity input
price display
remove product row button
add another product button

At the bottom:

Save Changes
Cancel
Add Order button and modal

Clicking Add Order should open a modal form for creating a new order.

Add Order modal structure
Section 1: Order info
Order ID (auto-generated preferred)
Date
Status, default value = Pending
Section 2: Customer info
Customer name
Phone number
Email (optional)
Section 3: Products

Allow multiple product rows:

Product selector
Quantity
Price
Remove row
Add another product
Section 4: Delivery details
Address line
City
Notes (optional)
Section 5: Summary
Total price calculated automatically if possible
Modal footer buttons
Cancel
Save Order
Bulk actions

When one or more rows are selected, enable the Bulk Actions dropdown.

Include:

Mark as Completed
Mark as Canceled
Delete Selected

Delete should always require confirmation.

Delete behavior
Single delete

From row actions menu:

Delete
Multi delete

From Bulk Actions:

Delete Selected

For both:

show confirmation modal
confirmation text example:
Are you sure you want to delete this order?
or
Are you sure you want to delete the selected orders?
Search behavior

The small search bar above the table should search across:

Order ID
Customer name
City
Product names

Placeholder:

Search orders, customers, cities...
Pagination

At the bottom of the table include pagination controls:

rows per page
previous / next
current page indicator
total results text such as:
1–10 of 126 orders
UX rules
keep the page clean and table-focused
do not add summary stat cards above the table
keep filters inside one dropdown or panel
use checkboxes for status filtering
use inline editable status chips in the table
use View as a read-only detailed drawer
use Edit for actual modifications
keep Delete inside actions and bulk actions only
keep address shortened in table but full in View/Edit
match the exact visual tone of the Overview page
Sample table data

Use realistic handmade-shop data such as:

Order ID: #BR-1092
Products: Palm Weave Basket, Ceramic Candle Cup
Customer Name: Nour Hany
Price: EGP 1,240
Date: 24 Mar 2026
Status: Pending
Address: 12 Salah Salem St, Apartment 4
City: Alexandria
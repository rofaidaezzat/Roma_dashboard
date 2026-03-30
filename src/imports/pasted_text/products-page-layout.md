Inside the main content area, create this structure from top to bottom:

1. Page header

At the top of the content area:

page title: Products
short subtitle: Manage product details, stock, collections, and visibility
on the right side add a primary button: Add Product

Optional secondary button:

Export
2. Controls row

Directly below the page header, add one horizontal controls bar.

Include:

a small table search input on the left with placeholder: Search products, categories, collections...
a Filter button that opens a dropdown panel
a Sort dropdown
a Bulk Actions dropdown, disabled until rows are selected
keep Add Product visible on the right if needed

This row should be compact and practical.

Filter dropdown content

The filter dropdown should open a clean panel containing the following sections:

Price filter

Include:

dual range slider
two number inputs:
Min price
Max price
Name filter

Include:

text input
placeholder: Search by product name
Stock status filter

Use checkboxes:

In Stock
Out of Stock
Category filter

Use checkboxes or multi-select list.

Examples:

Rings
Earrings
Necklaces
Bracelets
Sebha
Mugs
Keychains
Art Pieces
Coasters
Bookmarks
Special Pieces
Collection filter

Use checkboxes or multi-select list.

Examples:

Coastal
Boho
Pharaonic
Natural Flowers
Space
Royal
Afro
Vintage
Section filter

This refers to how the product is grouped or displayed.

Examples:

Featured
One of a Kind
New Arrival
Best Seller
Recommended

Use checkboxes or multi-select.

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
Name: A–Z
Name: Z–A
Quantity: Low to High
Quantity: High to Low

Default:

Newest first
Products table

The table is the main section of the page. Place it inside a large rounded white card with subtle border or soft shadow.

Table columns

Include these columns in this order:

selection checkbox
Product ID
Image
Name
Category
Section
Collection
Quantity
Stock Status
Price
Actions
Column behavior details
Selection checkbox
checkbox per row
select all checkbox in table header
selecting rows enables bulk actions
Product ID

Format like:

#PR-1024
Image

Show a small rounded product thumbnail:

square or slightly rounded rectangle
keep size consistent across rows
Name

Show product name clearly.
Optional smaller secondary line:

material
short subtitle
Keep it subtle.
Category

Examples:

Rings
Mugs
Art Pieces
Section

Examples:

Featured
One of a Kind
New Arrival

Display as soft neutral pills or plain text.

Collection

Examples:

Coastal
Boho
Vintage

Use small subtle tags or plain text.

Quantity

Display available quantity as number:

1
4
0

Since many handmade items are unique pieces, quantity will often be low.

Stock Status

Use status chips:

In Stock
Out of Stock

Color suggestion:

In Stock = muted green
Out of Stock = muted rose / soft red

This can be derived from quantity, but should still appear as a dedicated readable column.

Optional behavior:

if quantity = 0, auto set Out of Stock
if quantity > 0, auto set In Stock
Price

Display in EGP:

EGP 850
Actions

Use a 3-dot menu per row with:

View
Edit
Delete
View action

The View action should open a side drawer from the right.

This drawer is read-only and shows full product details.

View drawer content

Include:

Product ID
Large product image
Product name
Category
Section
Collection
Quantity
Stock status
Price
Product description if available
Materials if available
Notes if available

At the bottom:

Close
Edit Product
Edit action

The Edit action should open a form interface in a side drawer or large modal.

Prefill the current product data.

Editable fields

Allow editing:

product image
product name
category
section
collection
quantity
stock status
price
description
materials
notes

For image:

upload new image
replace image
remove image if needed

For section / collection:

use multi-select if product can belong to more than one
or single select if only one is allowed
Choose according to your product model

At the bottom:

Save Changes
Cancel
Add Product button and modal

Clicking Add Product should open a modal form for creating a new product.

Add Product modal structure
Section 1: Basic info
Product ID (auto-generated preferred)
Product name
Image upload
Section 2: Classification
Category dropdown
Section dropdown or multi-select
Collection dropdown or multi-select
Section 3: Inventory
Quantity input
Stock status
auto-calculated from quantity is preferred
but can also be shown as read-only preview
Section 4: Pricing
Price input
Section 5: Additional info
Description textarea
Materials input
Notes textarea
Modal footer buttons
Cancel
Save Product
Bulk actions

When one or more rows are selected, enable the Bulk Actions dropdown.

Include:

Delete Selected

Optional:

Mark In Stock
Mark Out of Stock
Add to Featured
Remove from Featured

But if you want to keep it simpler, just:

Delete Selected
Delete behavior
Single delete

From row actions menu:

Delete
Multi delete

From Bulk Actions:

Delete Selected

For both:

show confirmation modal
example text:
Are you sure you want to delete this product?
or
Are you sure you want to delete the selected products?
Search behavior

The small search bar above the table should search across:

product ID
product name
category
collection
section

Placeholder:

Search products, categories, collections...
Pagination

At the bottom of the table include:

rows per page
previous / next
current page indicator
total results text such as:
1–10 of 74 products
UX rules
keep the page clean and table-focused
do not add summary cards above the table
keep filters inside one dropdown or panel
use checkboxes for filters that may need multi-select
use a read-only drawer for View
use Edit for actual product changes
keep Delete inside actions and bulk actions
use rounded thumbnails and soft tags to match the handmade brand aesthetic
match the same visual language as the Overview page
Sample table data

Use realistic handmade store data such as:

Product ID: #PR-1024
Name: Pearl Wave Ring
Category: Rings
Section: Featured
Collection: Coastal
Quantity: 1
Stock Status: In Stock
Price: EGP 850

More examples:

Ceramic Moon Mug
Palm Charm Keychain
Golden Sand Bookmark
Royal Bloom Necklace
Visual style notes

Follow the existing dashboard aesthetic:

soft off-white page background
white table card
subtle borders
rounded corners
spacious padding
serif page title if used in Overview
clean sans-serif for table and controls
soft pink accent for active states, buttons, and selected menu items
muted text colors
premium minimal admin interface for a handmade boutique brand
My recommendation on section / collection behavior

For best UX:

Category = single select
Stock Status = auto based on quantity
Section = multi-select allowed
Collection = multi-select allowed
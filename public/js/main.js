// Frontend Code - likely to be broken out by page later

// Delete Invoice code - may need a separate function for dashboard invoice deletion vs invoice page deletion
const deleteButton = document.querySelectorAll('.del')

Array.from(deleteButton).forEach(e => e.addEventListener('click', deleteInvoice))

async function deleteInvoice() {
    const invoiceId = this.parentNode.dataset.id // will need to implement data-id in EJS file
    try {
        const response = await fetch('invoice/deleteInvoice', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'invoiceIdFromFile': invoiceId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload() // not sure if this will work how I intend it to
    } catch (err) {
        console.error(err)
    }
}


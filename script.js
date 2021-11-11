function addProducts() {
    var name = document.getElementById('name').value;
    var stock = document.getElementById('stock').value;
    var categorie = document.getElementById('categoryId').value;
    var price = document.getElementById('price').value;

    //var isverifref = verifREF(reference);
    /*if (!isverifref) {
        document.getElementById('RefMsgError').innerHTML = 'Please check Reference';
        document.getElementById('RefMsgError').style.color = '#eb7371';
    }*/
    var isverifstock = checkStock(stock);
    if (!isverifstock) {
        document.getElementById('StockMsgError').innerHTML = 'Please check Stock';
        document.getElementById('StockMsgError').style.color = '#eb7371';
    }
    var idProduct = JSON.parse(localStorage.getItem('iDProductKey') || '1')
    if (isverifstock) {

        var product = {
            id: idProduct,
            name: name,
            price: price,
            stock: stock,
            categorie: categorie,

        };
        var addproductTab = JSON.parse(localStorage.getItem('product') || '[]')
        addproductTab.push(product);
        localStorage.setItem('product', JSON.stringify(addproductTab));
        localStorage.setItem('iDProductKey', idProduct + 1);
    }
    else {
        alert("Error");
    }
}
function verifREF(ref) {
    var verif = false;
    if (ref[0] == "#" && ref.length >= 5) { verif = true; }
    return verif;
}
function checkStock(x) {
    return (x > 0);
}
function generatoreProducts() {

    var addproductTab = JSON.parse(localStorage.getItem('product') || '[]')
    var productSelect = ``;

    for (let i = 0; i < addproductTab.length; i++) {
        productSelect = productSelect + `
    <option value="${addproductTab[i].id}">${addproductTab[i].name}</option>`;
    }
    document.getElementById('productId').innerHTML = productSelect;
}
function generatoreOption() {

    var categorys = JSON.parse(localStorage.getItem('catogaryTab')) || [];
    var catalogueSelect = ``;

    for (let i = 0; i < categorys.length; i++) {
        catalogueSelect = catalogueSelect + `
    <option value="${categorys[i].name}">${categorys[i].name}</option>`;
    }
    document.getElementById('categoryId').innerHTML = catalogueSelect;
}
function addCategory() {
    var name = document.getElementById('nameId').value;
    var x = {};
    x.name = name;
    var catogaryTab = JSON.parse(localStorage.getItem('catogaryTab')) || [];
    catogaryTab.push(x);
    localStorage.setItem('catogaryTab', JSON.stringify(catogaryTab));
}
function invoice() {
    var qty = document.getElementById('qty').value;
    var productId = document.getElementById('productId').value;
    localStorage.setItem('qtyOrder', qty);
    localStorage.setItem('productOrder', productId);
    location.replace('invoice.html');

}

function checkQty(x) {
    return (x > 0 && x <= 10000);
}
function checkIfNumber(x) {
    return !isNaN(x);
}
function serchByID(id, key) {
    var Table = JSON.parse(localStorage.getItem(key) || '[]');
    for (var i = 0; i < Table.length; i++) {
        if (Table[i].id == id) {
            var findedObject = Table[i];
        }
    } return findedObject;
}
function generateInvoice() {
    var today = new Date();
    var DateTime = today.toLocaleString();
    document.getElementById('DateNow').innerHTML = DateTime;
    var productId = localStorage.getItem('productOrder');
    console.log(productId);
    var qty = localStorage.getItem('qtyOrder');
    var product = serchByID(productId, 'product');
    console.log(product);
    var invoicetable = `
    <table class="table">
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>PRICE</th>
            <th>Total</th>
  
        <tr>
                    <td>${product.name}</td>
                    <td>${qty}</td>
                    <td>${product.price}</td>
                    <td>${product.price * qty}</td>
                    </tr>`;

    invoicetable = invoicetable + ` </table>`;
    document.getElementById('invoices').innerHTML = invoicetable;

}
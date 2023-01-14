export async function getAllProducts() {

    let products =  await $.ajax({
        url: 'http://localhost:8000/api/produkt/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllProducts Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call get getAllProducts Failed !')
    })

    return products 
}

export async function getAllSoftware() {

    let software=  await $.ajax({
        url: 'http://localhost:8000/api/software/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllSoftware Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllSoftware Failed !')
    })

    return software
}

export async function getAllHardware() {

    let hardware =  await $.ajax({
        url: 'http://localhost:8000/api/hardware/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllHardware Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllHardware Failed !')
    })

    return hardware
}

export async function getAllSale() {

    let sale =  await $.ajax({
        url: 'http://localhost:8000/api/sale/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllSale Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllSale Failed !')
    })

    return sale
}

export async function getAllCountdown() {

    let countdown =  await $.ajax({
        url: 'http://localhost:8000/api/countdown/all',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false
    }).done(function(response){
        response
        console.log('AJAX Call getAllCountdown Successfully !')
    }).fail(function(response){
        response
        console.log('AJAX Call getAllCountdown Failed !')
    })

    return countdown 
}


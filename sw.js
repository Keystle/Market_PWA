self.addEventListener('install', e => {
    console.log('sw install')
})

self.addEventListener('activate', e => {
    console.log('sw activate')
})

self.addEventListener('fetch', e => {
    let {url, method} = e.request 
    
    console.log(method, url)

    let answer = fetch(e.request)
    e.respondWith(answer)
})

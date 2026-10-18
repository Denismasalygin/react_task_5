export function getShopArea(id) {
    return 400 + (id * 137) % 9600;
}

export function getShopPrice(id) {
    return 1500 + (id * 1379) % 18500;
}

export function getShopImage(id) {
    return `/react_task_5/images/shop/${id % 3}.jpg`;
}

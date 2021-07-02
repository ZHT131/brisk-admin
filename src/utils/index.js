import { isExternal } from './validate'
/**
 * 转化路由component实例化本地文件
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes) {
    const res = []

    routes.forEach(route => {
        let tmp = { ...route }
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children)
        }
        tmp.component = () => import(`${route.component}`);
        res.push(tmp)
    })

    return res
}

/**
 * 多维路由转化一维
 * @param routes asyncRoutes
 */
export function singleAsyncRoutes(routes) {
    var res = []
    routes.forEach(route => {
        let tmp = {
            ...route
        }
        res.push(tmp)
        let path_text = tmp.path;
        if (tmp.children) {
            let arr = singleAsyncRoutes(tmp.children);
            arr.forEach(child => {
                //判断是否是外部链接
                if (!isExternal(child.path)) {
                    //判断path最后一位是否为/
                    if (path_text.substr(path_text.length - 1, 1) != '/') {
                        child.path = path_text + '/' + child.path;
                    } else {
                        child.path = path_text + child.path;
                    }
                }
            })
            res = res.concat(arr);
        }
    })
    return res
}
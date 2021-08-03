import Mock from 'mockjs';

const adminUser = () => {
    let data = {
        rows: [],
        total: 10
    };

    for (let index = 0; index < 10; index++) {
        data.rows.push(Mock.mock({
            id: '@integer(1, 10)',
            username: '@ctitle',
            nickname: '@ctitle',
            group_id: '@integer(1, 10)',
            "group|2": {
                "name": "管理员组",
                "id": 1,
            },
            status: 1,
            status_text: '正常',
            createtime: '@datetime'
        }))
    }
    return data;
}

export {
    adminUser
}
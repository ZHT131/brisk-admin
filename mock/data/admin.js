import Mock from "mockjs";

const adminUser = (params) => {
  let body = JSON.parse(params.body);
  let data = {
    page: body.page,
    size: body.size,
    rows: [],
    total: 30,
  };

  for (let index = 0; index < body.size; index++) {
    data.rows.push(
      Mock.mock({
        id: "@integer(1, 100)",
        username: "@string('lower', 5)",
        nickname: "@ctitle",
        group_id: "@integer(1, 10)",
        "group|2": {
          name: "管理员组",
          id: 1,
        },
        status: 1,
        status_text: "正常",
        createtime: "@datetime",
      })
    );
  }
  return data;
};

const adminGroup = (params) => {
  let body = JSON.parse(params.body);
  let data = {
    page: body.page,
    size: body.size,
    rows: [],
    total: 30,
  };

  for (let index = 0; index < body.size; index++) {
    data.rows.push(
      Mock.mock({
        id: "@integer(1, 100000)",
        pid: 0,
        name: "@ctitle",
        status: 1,
        status_text: "正常",
        createtime: "@datetime",
        children: [
          {
            id: "@integer(1, 100)",
            pid: 1,
            name: "@ctitle",
            status: 1,
            status_text: "正常",
            createtime: "@datetime",
          },
        ],
      })
    );
  }
  return data;
};

const adminLog = (params) => {
  let body = JSON.parse(params.body);
  let data = {
    page: body.page,
    size: body.size,
    rows: [],
    total: 30,
  };

  for (let index = 0; index < body.size; index++) {
    data.rows.push(
      Mock.mock({
        id: "@integer(1, 100)",
        username: "@string('lower', 5)",
        title: "@ctitle",
        ip: "127.0.0.1",
        path_url: "/admin/index/index",
        status: 1,
        status_text: "正常",
        createtime: "@datetime",
      })
    );
  }
  return data;
};

const adminRule = (params) => {
  let body = JSON.parse(params.body);
  let data = {
    page: body.page,
    size: body.size,
    rows: [],
    total: 30,
  };

  for (let index = 0; index < body.size; index++) {
    data.rows.push(
      Mock.mock({
        id: "@integer(1, 100)",
        pid: 0,
        title: "@ctitle",
        rule: "auth/admin",
        status: 1,
        status_text: "正常",
        createtime: "@datetime",
        children: [
          {
            id: "@integer(1, 100)",
            pid: 1,
            title: "@ctitle",
            rule: "auth/admin",
            status: 1,
            status_text: "正常",
            createtime: "@datetime",
          },
        ],
      })
    );
  }
  return data;
};

export { adminUser, adminGroup, adminLog, adminRule };

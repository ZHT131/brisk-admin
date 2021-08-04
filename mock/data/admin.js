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

export { adminUser };

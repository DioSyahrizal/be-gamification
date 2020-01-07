"use strict";

const ok = (values: any, res: any) => {
  let data = {
    status: 200,
    values: values
  };
  res.json(data);
  res.end();
};

export default ok;

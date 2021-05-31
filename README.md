# vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# cascader
npm包使用步骤
1. npm install liufucheng-cascader
2. import cascader from "liufucheng-cascader";
3. import "liufucheng-cascader/dist/Cascader.css";
4. 注册 components: { cascader }
5. 使用 < cascader :options="options" v-model="value"></>
6. options格式如下：
    options: [
        {
          id: "00",
          label: "北京市",
          uid: "0",
          children: [
            {
              id: "0001",
              uid: "1",
              label: "朝阳区",
            },
          ],
        },
        {
          id: "01",
          uid: "0",
          label: "广西",
          children: [
            {
              id: "0101",
              uid: "1",
              label: "南宁",
              children: [
                {
                  id: "010101",
                  uid: "2",
                  label: "宾阳",
                },
                {
                  id: "010102",
                  uid: "2",
                  label: "武鸣",
                },
              ],
            },
            {
              id: "0102",
              uid: "1",
              label: "崇左",
              children: [
                {
                  id: "010201",
                  uid: "2",
                  label: "凭祥",
                },
                {
                  id: "010202",
                  uid: "2",
                  label: "宁明",
                },
              ],
            },
          ],
        },
        {
          id: "02",
          uid: "0",
          label: "江苏",
          children: [
            {
              id: "0201",
              uid: "1",
              label: "南京",
              children: [
                {
                  id: "020101",
                  uid: "2",
                  label: "中华门",
                },
              ],
            },
          ],
        },
      ],
// 必要的
value: [],
# cascader

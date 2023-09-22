# 快速上手

## 基本介绍
FortuneSheet是一款开箱即用的类似Excel和Google Sheets的javascript表格组件。

本项目源于 [Luckysheet](https://github.com/mengshukeji/Luckysheet)，并继承了它的很多代码。我们为将其转换为typescript做了很多努力，并且解决了一些项目层面的问题。

## Demo
[在线demo](https://ruilisi.github.io/fortune-sheet-demo/)

## 特性
(~~划线~~ 表示已计划但尚未实现)

### ️格式设置
+ **样式** (~~修改字体样式~~，字号，颜色或者其他通用的样式)
+ ~~**条件格式**~~ (突出显示所关注的单元格或单元格区域；强调异常值；使用数据栏、色阶和图标集（与数据中的特定变体对应）直观地显示数据)
+ **文本对齐及旋转** 
+ **支持文本的截断、溢出、自动换行** 
+ **数据类型** 
	+ **货币, 百分比, 数字, 日期** 
	+ **Custom** (和excel保持一致，例如： `##,###0.00` , `$1,234.56$##,###0.00_);[Red]($##,###0.00)`, `_($* ##,###0.00_);_(...($* "-"_);_(@_)`, `08-05 PM 01:30MM-dd AM/PM hh:mm` )
+ **单元格内多样式** (Alt+Enter单元格内换行、上标、下标、单元格内可定义每个文字的不同样式)

### 单元格
+ **拖拽选取来修改单元格**(对选区进行操作，可以拖动四边来移动选区，也可以在右下角对选区进行下拉填充操作)
+ **选区下拉填充** (对于一个1,2,3,4,5的序列，将会按照间隔为1进行下拉填充，而对2,4,6,8将会以2作为间隔。支持等差数列，等比数列，日期，周，天，月，年，中文数字填充)
+ ~~**自动填充选项**~~ (下拉填充后，会出现填充选项的菜单，支持选择复制，序列，仅格式，只填充格式，天，月，年的选择)
+ **多选区操作** (可以按住Ctrl键进行单元格多选操作，支持多选区的复制粘贴)
+ **查找和替换** (对内容进行查找替换，支持正则表达式，整词，大小写敏感)
+ ~~**定位**~~ (可以根据单元格的数据类型进行自动定位并选中，选中后可以批量进行格式等操作)
+ **合并单元格**
+ **数据验证(表单功能)**  (支持Checkbox, drop-down list, datePicker)

### ️行和列操作
+ **隐藏，插入，删除行或列** 
+ **冻结行或列** (支持冻结首行和首列，冻结到选区，冻结调节杆可以进行拖动操作)
+ **文本分列** (可以把文本根据不同符号进行拆分，和excel的分列功能类似)

### 操作体验
+ **撤销/重做**
+ **复制/粘贴/剪切操作** (支持Luckysheet到excel和excel到Luckysheet带格式的互相拷贝)
+ **快捷键支持** (快捷键操作保持与excel一致，如果有不同或者缺失请反馈给我们)
+ **格式刷** (与google sheet类似)
+ **任意选区拖拽** (选择单元格，输入公式，插入图表，会与选区相关，可以通过任意拖动和放大缩小选区来改变与之关联的参数)

### ️公式和函数
+ **内置公式**
	+ 数学 (SUMIFS, AVERAGEIFS, SUMIF, SUM, etc.)
	+ 文本 (CONCATENATE, REGEXMATCH, MID)
	+ 日期 (DATEVALUE, DATEDIF, NOW, WEEKDAY, etc.)
	+ 财务 (PV, FV, IRR, NPV, etc.)
	+ 逻辑 (IF, AND, OR, IFERROR, etc.)
	+ 查找和引用 (VLOOKUP, HLOOkUP, INDIRECT, OFFSET, etc.)
	+ 动态数组 (Excel2019新函数，SORT,FILTER,UNIQUE,RANDARRAY,SEQUENCE)
+ **公式支持数组** (={1,2,3,4,5,6}, Crtl+Shift+Enter)
+ ~~**自定义公式**~~  (根据身份证识别年龄，性别，生日，省份，城市等. AGE_BY_IDCARD, SEX_BY_IDCARD, BIRTHDAY_BY_IDCARD, PROVINCE_BY_IDCARD, CITY_BY_IDCARD, etc. 可以任意加入自己的公式哦)

### 表格操作
+ **筛选** (支持颜色、数字、字符、日期的筛选)
+ **排序** (同时加入多个字段进行排序)

### ~~数据透视表~~
+ **字段拖拽** (操作方式与excel类似，拖动字段到行、列、数值、筛选等4个区域)
+ **聚合方式**  (支持汇总、计数、去重计数、平均、最大、最小、中位数、协方差、标准差、方差等计算)
+ **筛选数据** (可对字段进行筛选后再进行汇总)
+ **数据透视表下钻** (双击数据透视表中的数据，可以下钻查看到明细，操作方式与excel一致)
+ **根据数据透视表新建图表** (数据透视表产生的数据也可以进行图表的制作)

### ~~图表~~
+ **支持的图表类型** (目前折线图、柱状图、面积图、条形图、饼图可以使用，散点图、雷达图、仪表盘、漏斗图正在接入，其他图表正在陆续开发中，请大家给予建议) 
+ **关于图表插件**  (图表使用了一个中间插件[ChartMix](https://github.com/mengshukeji/chartMix)(MIT协议): 目前支持ECharts，正在逐步接入Highcharts、阿里G2、amCharts、googleChart、chart.js)
+ **Sparklines小图** (以公式的形式进行设置和展示，目前支持：折线图、面积图、柱状图、累积图、条形图、离散图、三态图、饼图、箱线图等)

### ️~~分享及写作~~
+ **评论** (评论的删除、添加、修改、隐藏)
+ **共享编辑** (支持多用户共享编辑，内置API)

### 插入对象
+ **插入图片** (支持JPG,PNG,SVG的插入、修改和删除，并且随表格的变动而产生变化)

### 杂项
+ **截图** (把选区的内容进行截图展示)
+ ~~**EXCEL导入及导出**~~ (专为Luckysheet打造的导入导出插件，支持密码、水印、公式等的本地导入导出，导出正在开发)

## 快速开始 (react)

### 安装库
```shell
yarn add @fortune-sheet/react
```
或使用 npm:
```shell
npm install @fortune-sheet/react
```

### 创建一个HTML容器
```html
<style>
  html, body, #root {
    width: 100%;
    height: 100%;
  }
</style>
<div id="root"></div>
```

**注意**: `width` 和 `height` 不是一定要设为 100%, 但要有值. 如果设为 `auto`, 表格区域有可能不显示.

### 渲染表格

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"

ReactDOM.render(
  <Workbook data={[{ name: "Sheet1" }]} />,
  document.getElementById('root')
);
```

## 开发
### 安装
```shell
yarn
```

### 开发
```shell
yarn dev
```

### 打包
```shell
yarn build
```

## 配置

详情请参考 [整体配置](./config.md).

## 快捷键

| 快捷键 | 功能 |
| ------------ | ------------ |
|  CTRL + C | 复制单元格 |
|  CTRL + V | 粘贴单元格 |
|  CTRL + X | 剪切单元格 |
|  CTRL + Z | 撤销 |
|  CTRL + Y | 重做 |
|  CTRL + A | 全选 |
|  CTRL + B | 加粗 |
|  CTRL + F | 查找 |
|  CTRL + H | 替换 |
|  CTRL + I | 斜体 |
|  ~~CTRL + UP/DOWN/LEFT/RIGHT~~ | 快捷调整单元格选框 |
|  ~~SHIFT + UP/DOWN/LEFT/RIGHT~~ | 调整选区 |
|  CTRL + 鼠标左击 | 多选单元格 |
|  ~~SHIFT + 鼠标左击~~ | 调整选区 |
|  UP/DOWN/LEFT/RIGHT | 移动单元格选框 |
|  ENTER | 编辑单元格 |
|  TAB | 向右移动单元格选框 |
|  DELETE | 清除单元格数据 |

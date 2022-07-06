# vsmeta

> nodejs 实现生成群晖 Video Station 元数据信息文件

### 说明

vsmeta 类型的元数据文件仅支持群晖系统的 Video Station 使用, 文件格式为 `*.vsmeta`

例如:

原视频文件: MVI_1166.MP4

生成的元数据文件: MVI_1166.MP4.vsmeta

### TODO

- [x] Movie 数据
- [ ] Series 数据

### 鸣谢

#### 特别感谢以下作者及所开发的程序，本项目参考过以下几位开发者代码及思想。

- @soywiz: [gist](https://gist.github.com/soywiz/2c10feb1231e70aca19a58aca9d6c16a)
- @TomMeHo: [TomMeHo/vsMetaFileEncoder](https://github.com/TomMeHo/vsMetaFileEncoder/blob/main/src/vsmetaEncoder/vsmetaBase.py)
- @ysy: [ysy/mk_vsmeta](https://github.com/ysy/mk_vsmeta/blob/master/main.c)
- @dengyull: [dengyull/Synology-vsmeta](https://github.com/dengyull/Synology-vsmeta/blob/0fb3fcc03128d6daa72249601c22efd97be1aa8d/nfo.java)
- @ylqjgm: [ylqjgm/AVMeta](https://github.com/ylqjgm/AVMeta/blob/f94b721d1d5ada090c199b8d081e43f26e4af9a8/pkg/media/vsmeta.go)

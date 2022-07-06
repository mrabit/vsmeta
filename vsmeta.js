const md5 = require('md5')

const TAG_SHOW_TITLE = 0x12
const TAG_SHOW_TITLE2 = 0x1a
const TAG_EPISODE_TITLE = 0x22
const TAG_YEAR = 0x28
const TAG_EPISODE_RELEASE_DATE = 0x32
const TAG_EPISODE_LOCKED = 0x38
const TAG_CHAPTER_SUMMARY = 0x42
const TAG_EPISODE_META_JSON = 0x4a
const TAG_GROUP1 = 0x52
const TAG_CLASSIFICATION = 0x5a
const TAG_RATING = 0x60

const TAG_EPISODE_THUMB_DATA = 0x8a
const TAG_EPISODE_THUMB_MD5 = 0x92

const TAG_GROUP2 = 0x9a

const TAG1_CAST = 0x0a
const TAG1_DIRECTOR = 0x12
const TAG1_GENRE = 0x1a
const TAG1_WRITER = 0x22

const TAG2_SEASON = 0x08
const TAG2_EPISODE = 0x10
const TAG2_TV_SHOW_YEAR = 0x18
const TAG2_RELEASE_DATE_TV_SHOW = 0x22
const TAG2_LOCKED = 0x28
const TAG2_TVSHOW_SUMMARY = 0x32
const TAG2_POSTER_DATA = 0x3a
const TAG2_POSTER_MD5 = 0x42
const TAG2_TVSHOW_META_JSON = 0x4a
const TAG2_GROUP3 = 0x52

const TAG3_BACKDROP_DATA = 0x0a
const TAG3_BACKDROP_MD5 = 0x12
const TAG3_TIMESTAMP = 0x18

class ByteArray {
  constructor() {
    this.byte = []
  }
  get length() {
    return this.byte.length
  }
  // 写入数据
  write(tag) {
    this.byte.push(tag)
  }
  // 写入整数数据
  writeInt(int, size = 255) {
    while (int > size) {
      this.write((int % 128) + 128)
      int = Math.floor(int / 128)
    }
    this.write(int)
  }
  // 写入字符串数据
  writeString(string, size = 255) {
    let buffer = new Buffer.from(string)
    this.writeInt(buffer.length, size)
    buffer.forEach(v => this.write(v))
  }
  toString() {
    return this.toBuffer().toString()
  }
  toBuffer() {
    return new Buffer.from(this.byte)
  }
}

module.exports = class VsMeta extends ByteArray {
  constructor(info) {
    super()
    if (!info) return
    this.info = info

    this.write(0x08)
    this.write(0x01)

    // 标题
    this.write(TAG_SHOW_TITLE)
    this.writeString(info.title)

    // 标题2
    this.write(TAG_SHOW_TITLE2)
    this.writeString(info.title)

    // 副标题
    this.write(TAG_EPISODE_TITLE)
    this.writeString(info.episodeTitle)

    // 年份
    this.write(TAG_YEAR)
    this.write(0xdc)
    this.write(0x0f)

    // 年份
    this.write(TAG_EPISODE_RELEASE_DATE)
    this.writeString(info.episodeReleaseDate)

    // 锁定
    this.write(TAG_EPISODE_LOCKED)
    this.write(0x01)

    // 简介
    this.write(TAG_CHAPTER_SUMMARY)
    this.writeString(info.chapterSummary, 80)

    // 来源json
    this.write(TAG_EPISODE_META_JSON)
    this.writeString(info.tagEpisodeMetaJson)

    // 组数据1
    this.writeGroup1()

    // 级别
    this.write(TAG_CLASSIFICATION)
    this.writeString(info.classification)

    // 评分
    this.write(TAG_RATING)
    this.write(info.rating)

    // 封面
    this.write(TAG_EPISODE_THUMB_DATA)
    this.write(0x01)
    this.writeString(info.poster)
    // 封面 md5
    this.write(TAG_EPISODE_THUMB_MD5)
    this.write(0x01)
    this.writeString(md5(info.poster))

    // 组数据3
    this.writeGroup3()
  }
  writeGroup1(size = 255) {
    let info = this.info
    let byteArray = new ByteArray()
    // 演员
    info.cast.forEach(v => {
      byteArray.write(TAG1_CAST)
      byteArray.writeString(v)
    })
    // 导演
    info.director.forEach(v => {
      byteArray.write(TAG1_DIRECTOR)
      byteArray.writeString(v)
    })
    // 类型
    info.genre.forEach(v => {
      byteArray.write(TAG1_GENRE)
      byteArray.writeString(v)
    })
    // 作者
    info.write.forEach(v => {
      byteArray.write(TAG1_WRITER)
      byteArray.writeString(v)
    })
    this.write(TAG_GROUP1)
    this.writeInt(byteArray.length, size)
    byteArray.byte.forEach(v => this.write(v))
  }
  writeGroup3() {
    let info = this.info
    let byteArray = new ByteArray()
    // 背景
    byteArray.write(TAG3_BACKDROP_DATA)
    byteArray.writeString(info.backdrop, 128)

    // 背景 md5
    byteArray.write(TAG3_BACKDROP_MD5)
    byteArray.writeString(md5(info.backdrop))

    // 时间戳
    byteArray.write(TAG3_TIMESTAMP)
    byteArray.writeInt(Math.floor(+new Date() / 1000))

    this.write(0xaa)
    this.write(0x01)
    this.writeInt(byteArray.length)
    byteArray.byte.forEach(v => this.write(v))
  }
}

const fs = require("fs");
const md5 = require("md5");

const TAG_SHOW_TITLE = 0x12;
const TAG_SHOW_TITLE2 = 0x1a;
const TAG_EPISODE_TITLE = 0x22;
const TAG_YEAR = 0x28;
const TAG_EPISODE_RELEASE_DATE = 0x32;
const TAG_EPISODE_LOCKED = 0x38;
const TAG_CHAPTER_SUMMARY = 0x42;
const TAG_EPISODE_META_JSON = 0x4a;
const TAG_GROUP1 = 0x52;
const TAG_CLASSIFICATION = 0x5a;
const TAG_RATING = 0x60;

const TAG_EPISODE_THUMB_DATA = 0x8a;
const TAG_EPISODE_THUMB_MD5 = 0x92;

const TAG_GROUP2 = 0x9a;

const TAG1_CAST = 0x0a;
const TAG1_DIRECTOR = 0x12;
const TAG1_GENRE = 0x1a;
const TAG1_WRITER = 0x22;

const TAG2_SEASON = 0x08;
const TAG2_EPISODE = 0x10;
const TAG2_TV_SHOW_YEAR = 0x18;
const TAG2_RELEASE_DATE_TV_SHOW = 0x22;
const TAG2_LOCKED = 0x28;
const TAG2_TVSHOW_SUMMARY = 0x32;
const TAG2_POSTER_DATA = 0x3a;
const TAG2_POSTER_MD5 = 0x42;
const TAG2_TVSHOW_META_JSON = 0x4a;
const TAG2_GROUP3 = 0x52;

const TAG3_BACKDROP_DATA = 0x0a;
const TAG3_BACKDROP_MD5 = 0x12;
const TAG3_TIMESTAMP = 0x18;

let info = {
  title: "追龙",
  episodeTitle: "",
  year: "2022",
  episodeReleaseDate: "2017-09-28",
  episodeLocked: 1,
  chapterSummary:
    "电影讲述了香港现代史上两大著名狠角色大毒枭跛豪（甄子丹饰）、五亿探长雷洛（刘德华饰）的传奇故事。上世纪六七十年代，香港由英国殖民，权势腐败、社会混乱。1963年，穷困潦倒的青年阿豪（甄子丹饰）偷渡至香港，抱着“生死有命、富贵在天”之心决意一搏人生。阿豪带着几个兄弟，从九龙城寨底层开始一路刀刃舔血，爬上香港毒品霸主之位，一手掌控香港十大黑帮，江湖人称“跛豪”。而雷洛（刘德华饰）则从一位普通探长一步步爬上华人总探长高位，统领全香港三万警察，手握香港治安“潜规则”。为垄断香港黄赌毒三大经济产业，跛豪与雷洛结拜为兄弟，两人一黑一白两手遮天，权势滔天，家财亿万，独霸香港岛……",
  tagEpisodeMetaJson: JSON.stringify({
    "com.synology.TheMovieDb": {
      backdrop: [
        "https://image.tmdb.org/t/p/original/vLgkglkAOgXzy8sXscFLvidgaTM.jpg",
      ],
      collection_id: { themoviedb: 707637 },
      poster: [
        "https://image.tmdb.org/t/p/w500/bzdtfWDNIVVMCtCAQvgBNK7GHH6.jpg",
      ],
      rating: { themoviedb: 7 },
      reference: { imdb: "tt6015328", themoviedb: 449927 },
    },
  }),
  cast: [
    "Donnie Yen",
    "Andy Lau",
    "Kent Cheng",
    "Wilfred Lau",
    "Felix Wong",
    "Philip Keung",
    "Michelle Hu",
    "Raquel Xu",
    "Philip Ng",
    "Kent Tong",
    "Niki Chow",
    "Bryan Larkin",
    "Julian Gaertner",
    "Philippe Joly",
    "Kenneth Tsang",
    "Michael Chan",
    "Terence Yin",
    "Ricky Yi Fan-wai",
    "Ben Ng",
    "Jai Day",
    "Jason Wong",
  ],
  director: ["Aman Chang", "Wong Jing", "Jason Kwan"],
  genre: ["动作", "犯罪", "历史"],
  write: ["Wong Jing", "Jason Kwan"],
  classification: "",
  rating: 70,
};

let backdrop = `/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcU
FhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgo
KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIA
AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEB
AAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJaAB//Z`;
let episodeThumb = `/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcU
FhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgo
KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAfACIDASIA
AhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAcFBgIDBAj/xAArEAABAwIEBAYDAQAAAAAAAAAB
AgMEAAUGETFBEiFRYQciI3GBsTJiweH/xAAZAQACAwEAAAAAAAAAAAAAAAADBgIEBQf/xAAoEQAB
BAAEAwkAAAAAAAAAAAABAAIDBAUREyESIjEzQVJhgZGxweH/2gAMAwEAAhEDEQA/AGvijFD86e8x
GdU3DbUUAIOXHluajbddJEN0OR3loUOh5H3G9QV1jvWy6SYcgFK2lkc9xsfkc6xakd6XnTOLyXHd
dDjoxNhDWAcOXurnPv8ALuLmbznCjZtHJNbbZd5ENwKZcPCNUE+U/FVJqR3rsZfzOQ1ogmcTnnuq
z6TA3gDdk3GbxDcZQsuhJUkHhO2e1FVmNheWuO0tTgQpSQSk6g5aUVpiSbwpZNapn2iksZ4WYxDE
zTwtT2x6TvX9Vdvr7SkyPJt0t2LMbU0+2clJVtXo+qj4h4aReraqTHSlM+MklJ040jmUn+f7QblT
UGozr8q9gmLmu4V5jyHp5fiT7L5zyGtNbAuFjGQ3cLoj1z5mmVD8O579tvfTi8OsGpjoau10Slby
gFMNahA2Uep6dPfRi1ClUIGpJ6I+NYsHE16527z9BFFFFaaVl//Z`;
backdrop = fs
  .readFileSync("./assets/vLgkglkAOgXzy8sXscFLvidgaTM.jpg")
  .toString("base64");
episodeThumb = fs
  .readFileSync("./assets/bzdtfWDNIVVMCtCAQvgBNK7GHH6.jpg")
  .toString("base64");

class ByteArray {
  constructor() {
    this.byte = [];
  }
  get length() {
    return this.byte.length;
  }
  // 写入数据
  write(tag) {
    this.byte.push(tag);
  }
  // 写入整数数据
  writeInt(int, size = 255) {
    while (int > size) {
      this.write((int % 128) + 128);
      int = Math.floor(int / 128);
    }
    this.write(int);
  }
  // 写入字符串数据
  writeString(string, size = 255) {
    let buffer = new Buffer.from(string);
    this.writeInt(buffer.length, size);
    buffer.forEach((v) => this.write(v));
  }
  writeGroup1(info, size = 255) {
    let byteArray = new ByteArray();
    // 演员
    info.cast.forEach((v) => {
      byteArray.write(TAG1_CAST);
      byteArray.writeString(v);
    });
    // 导演
    info.director.forEach((v) => {
      byteArray.write(TAG1_DIRECTOR);
      byteArray.writeString(v);
    });
    // 类型
    info.genre.forEach((v) => {
      byteArray.write(TAG1_GENRE);
      byteArray.writeString(v);
    });
    // 作者
    info.write.forEach((v) => {
      byteArray.write(TAG1_WRITER);
      byteArray.writeString(v);
    });
    this.write(TAG_GROUP1);
    this.writeInt(byteArray.length, size);
    byteArray.byte.forEach((v) => this.write(v));
  }
  writeGroup3() {
    let byteArray = new ByteArray();
    // 背景
    byteArray.write(TAG3_BACKDROP_DATA);
    byteArray.writeString(backdrop, 128);

    // 背景 md5
    byteArray.write(TAG3_BACKDROP_MD5);
    byteArray.writeString(md5(backdrop));

    // 时间戳
    byteArray.write(TAG3_TIMESTAMP);
    byteArray.writeInt(Math.floor(+new Date() / 1000));

    this.write(0xaa);
    this.write(0x01);
    this.writeInt(byteArray.length);
    byteArray.byte.forEach((v) => this.write(v));
  }
  toString() {
    return this.toBuffer().toString();
  }
  toBuffer() {
    return new Buffer.from(this.byte);
  }
}

let byteArray = new ByteArray();
byteArray.write(0x08);
byteArray.write(0x01);

// 标题
byteArray.write(TAG_SHOW_TITLE);
byteArray.writeString(info.title);

// 标题2
byteArray.write(TAG_SHOW_TITLE2);
byteArray.writeString(info.title);

// 副标题
byteArray.write(TAG_EPISODE_TITLE);
byteArray.writeString(info.episodeTitle);

// 年份
byteArray.write(TAG_YEAR);
byteArray.write(0xdc);
byteArray.write(0x0f);

// 年份
byteArray.write(TAG_EPISODE_RELEASE_DATE);
byteArray.writeString(info.episodeReleaseDate);

// 锁定
byteArray.write(TAG_EPISODE_LOCKED);
byteArray.write(0x01);

// 简介
byteArray.write(TAG_CHAPTER_SUMMARY);
byteArray.writeString(info.chapterSummary, 80);

// 来源json
byteArray.write(TAG_EPISODE_META_JSON);
byteArray.writeString(info.tagEpisodeMetaJson);

// 组数据1
byteArray.writeGroup1(info);

// 级别
byteArray.write(TAG_CLASSIFICATION);
byteArray.writeString(info.classification);

// 评分
byteArray.write(TAG_RATING);
byteArray.write(info.rating);

// 封面
byteArray.write(TAG_EPISODE_THUMB_DATA);
byteArray.write(0x01);
byteArray.writeString(episodeThumb);
// 封面 md5
byteArray.write(TAG_EPISODE_THUMB_MD5);
byteArray.write(0x01);
byteArray.writeString(md5(episodeThumb));

// 组数据3
byteArray.writeGroup3();

fs.writeFileSync("./MVI_1166.MP4.vsmeta", byteArray.toBuffer());

console.log(byteArray.toBuffer(), byteArray.length);

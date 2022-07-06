const fs = require('fs')
const VsMeta = require('./vsmeta')

let info = {
  title: '追龙',
  episodeTitle: '',
  year: '2022',
  episodeReleaseDate: '2017-09-28',
  episodeLocked: 1,
  chapterSummary:
    '电影讲述了香港现代史上两大著名狠角色大毒枭跛豪（甄子丹饰）、五亿探长雷洛（刘德华饰）的传奇故事。上世纪六七十年代，香港由英国殖民，权势腐败、社会混乱。1963年，穷困潦倒的青年阿豪（甄子丹饰）偷渡至香港，抱着“生死有命、富贵在天”之心决意一搏人生。阿豪带着几个兄弟，从九龙城寨底层开始一路刀刃舔血，爬上香港毒品霸主之位，一手掌控香港十大黑帮，江湖人称“跛豪”。而雷洛（刘德华饰）则从一位普通探长一步步爬上华人总探长高位，统领全香港三万警察，手握香港治安“潜规则”。为垄断香港黄赌毒三大经济产业，跛豪与雷洛结拜为兄弟，两人一黑一白两手遮天，权势滔天，家财亿万，独霸香港岛……',
  tagEpisodeMetaJson: JSON.stringify({
    'com.synology.TheMovieDb': {
      backdrop: [
        'https://image.tmdb.org/t/p/original/vLgkglkAOgXzy8sXscFLvidgaTM.jpg'
      ],
      collection_id: { themoviedb: 707637 },
      poster: [
        'https://image.tmdb.org/t/p/w500/bzdtfWDNIVVMCtCAQvgBNK7GHH6.jpg'
      ],
      rating: { themoviedb: 7 },
      reference: { imdb: 'tt6015328', themoviedb: 449927 }
    }
  }),
  cast: [
    'Donnie Yen',
    'Andy Lau',
    'Kent Cheng',
    'Wilfred Lau',
    'Felix Wong',
    'Philip Keung',
    'Michelle Hu',
    'Raquel Xu',
    'Philip Ng',
    'Kent Tong',
    'Niki Chow',
    'Bryan Larkin',
    'Julian Gaertner',
    'Philippe Joly',
    'Kenneth Tsang',
    'Michael Chan',
    'Terence Yin',
    'Ricky Yi Fan-wai',
    'Ben Ng',
    'Jai Day',
    'Jason Wong'
  ],
  director: ['Aman Chang', 'Wong Jing', 'Jason Kwan'],
  genre: ['动作', '犯罪', '历史'],
  write: ['Wong Jing', 'Jason Kwan'],
  classification: '',
  rating: 70,
  backdrop: fs
    .readFileSync('./assets/vLgkglkAOgXzy8sXscFLvidgaTM.jpg')
    .toString('base64'),
  poster: fs
    .readFileSync('./assets/bzdtfWDNIVVMCtCAQvgBNK7GHH6.jpg')
    .toString('base64')
}

let vsmeta = new VsMeta(info)

fs.writeFileSync('./MVI_1166.MP4.vsmeta', vsmeta.toBuffer())

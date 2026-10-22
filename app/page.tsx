'use client';
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { toPng } from 'html-to-image';
import { useSearchParams, useRouter } from 'next/navigation';
interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  reposts: number;
  views: number;
  avatarUrl: string;
  tweetUrl: string;
}
const initialTweets: Tweet[] = [
  // ===== S - Anti-white Racism =====
  {
    id: "2061573327911543106",
    author: "Visegrád 24",
    handle: "@visegrad24",
    content: "Southampton police arrest stabbing victim Henry Nowak",
    likes: 130000,
    reposts: 35000,
    views: 22000000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1875625827674591232/OBzjRIZ4_400x400.jpg",
    tweetUrl: "https://x.com/visegrad24/status/2061573327911543106"
  },
  {
    id: "2072389805032305037",
    author: "Joshua",
    handle: "@Re_mi_gra_tion",
    content: "Birmingham police arrest assault victim Cody Harper",
    likes: 113000,
    reposts: 23000,
    views: 16400000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2043446340936687616/oa-VZrH4_400x400.jpg",
    tweetUrl: "https://x.com/Re_mi_gra_tion/status/2072389805032305037"
  },
  {
    id: "2076630838658146406",
    author: "Tommy Robinson",
    handle: "@TRobinsonNewEra",
    content: "More evidence of anti white DEI policing.",
    likes: 24000,
    reposts: 7400,
    views: 503000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2007262159403671552/-DltTmcT_400x400.jpg",
    tweetUrl: "https://x.com/TRobinsonNewEra/status/2076630838658146406"
  },
  // ===== A - Violent Policing =====
  {
    id: "2063310379904577880",
    author: "BritMatters 🇬🇧",
    handle: "@britmatters",
    content: "15-Year-Old Impaled on Spiked Railings by Suffolk Police.",
    likes: 4300,
    reposts: 2400,
    views: 187400,
    avatarUrl: "https://pbs.twimg.com/profile_images/1998156217550598144/sqVKF_qg_400x400.jpg",
    tweetUrl: "https://x.com/britmatters/status/2063310379904577880"
  },
  {
    id: "2071609632993288677",
    author: "Britain Is Broken",
    handle: "@BROKENBRITAIN0",
    content: "Police use riot shields to batter military veteran",
    likes: 23000,
    reposts: 4700,
    views: 825000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2063329057320624128/Tx7pGN7X_400x400.jpg",
    tweetUrl: "https://x.com/BROKENBRITAIN0/status/2071609632993288677"
  },
  {
    id: "2075556663164109257",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "West Yorkshire police officer punches 16-year-old girl with special needs in the face. They wouldn't treat an illegal migrant like this.",
    likes: 5100,
    reposts: 2400,
    views: 184000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2075556663164109257"
  },
  {
    id: "2066098327347761412",
    author: "Mario ZNA",
    handle: "@MarioBojic",
    content: "UK Police arrested a crying 5-year-old boy while taking away his father.",
    likes: 70000,
    reposts: 27000,
    views: 3600000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1568578086484037632/i3dKr8r__400x400.jpg",
    tweetUrl: "https://x.com/MarioBojic/status/2066098327347761412"
  },
  {
    id: "2063641296489599358",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "Hampshire Police violently arrest 15-year-old girl in Southampton for running away from foster care.",
    likes: 18000,
    reposts: 7300,
    views: 549000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2063641296489599358"
  },
  // ===== B - Thought Police =====
  {
    id: "2073427211898556481",
    author: "News Now Yorkshire",
    handle: "@NewsNowYorks",
    content: "Police in Leeds are now arresting people for insulting Muhammad",
    likes: 13000,
    reposts: 4200,
    views: 2100000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1895405336686710784/hmKeOzLS_400x400.jpg",
    tweetUrl: "https://x.com/NewsNowYorks/status/2073427211898556481"
  },
  {
    id: "2072582825954467905",
    author: "Skint Eastwood",
    handle: "@Skint_Eastwood1",
    content: "UK police officer threatens to arrest a man for peacefully filming in public, because his presence “might” wind people up and cause someone else to lose their temper.",
    likes: 23000,
    reposts: 7300,
    views: 1000000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2019411824270090240/AL1pSX5D_400x400.jpg",
    tweetUrl: "https://x.com/Skint_Eastwood1/status/2072582825954467905"
  },
  {
    id: "2072966413841567810",
    author: "HJB News",
    handle: "@HJB_News__",
    content: "British police arrest member of the Public for filming outside which is perfectly legal.",
    likes: 1800,
    reposts: 526,
    views: 258000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2006926965429723136/nuuCSsTe_400x400.jpg",
    tweetUrl: "https://x.com/HJB_News__/status/2072966413841567810"
  },
  {
    id: "2083169814521037033",
    author: "The Free Speech Union",
    handle: "@SpeechUnion",
    content: "An Animal rights campaigner was told to accept a police record, attend an “online thinking” course, or face arrest following comments she made on social media.",
    likes: 8600,
    reposts: 2700,
    views: 351000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1226483248458555393/o11tG_Sj_400x400.jpg",
    tweetUrl: "https://x.com/SpeechUnion/status/2083169814521037033"
  },
  {
    id: "2078216763024535716",
    author: "The media SOI",
    handle: "@MediaSOI",
    content: "Up Scotland police pull a taser out on concerned parents after migrants kept a 14 year old girl against her will locked in their flat for 3 days",
    likes: 2000,
    reposts: 82,
    views: 41400,
    avatarUrl: "https://pbs.twimg.com/profile_images/2074137677620768768/yeoj3BGI_400x400.jpg",
    tweetUrl: "https://x.com/MediaSOI/status/2078216763024535716"
  },
  // ===== C - Failed Arrest =====
  {
    id: "2082148843500523718",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "Migrant takes down female police officer with pepper spray in Luton.",
    likes: 354,
    reposts: 98,
    views: 65000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2082148843500523718"
  },
  {
    id: "2073285994279842042",
    author: "Tony",
    handle: "@EvacTony",
    content: "A suspect overpowers two West Mids Police officers",
    likes: 2900,
    reposts: 441,
    views: 333333,
    avatarUrl: "https://pbs.twimg.com/profile_images/2045764888031559680/fJEED4ke_400x400.jpg",
    tweetUrl: "https://x.com/EvacTony/status/2073285994279842042"
  },
  {
    id: "2074418780726292717",
    author: "Retard Radar",
    handle: "@FullRetardRadar",
    content: "Absolute state of British police. Invader casually walks up to a police car, pops the door like it’s his personal Uber, springs his fellow criminal invader, and they both bolt while the coppers just stand there.",
    likes: 75,
    reposts: 40,
    views: 52300,
    avatarUrl: "https://pbs.twimg.com/profile_images/2067713504182697984/xG9JHwPk_400x400.jpg",
    tweetUrl: "https://x.com/FullRetardRadar/status/2074418780726292717"
  },
  {
    id: "1682023053247778818",
    author: "Catch Up",
    handle: "@CatchUpFeed",
    content: "Policing in Britain just isn’t what it used to be.",
    likes: 100,
    reposts: 23,
    views: 27784,
    avatarUrl: "https://pbs.twimg.com/profile_images/1559650300964872194/8NKDFstI_400x400.png",
    tweetUrl: "https://x.com/CatchUpFeed/status/1682023053247778818"
  },
  // ===== D - Two Tier Policing =====
  {
    id: "2075470278621065366",
    author: "Visegrád 24",
    handle: "@visegrad24",
    content: "British police officers fleeing rioting supporters of Morocco in London after the France-Morocco game",
    likes: 5000,
    reposts: 1400,
    views: 909000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1875625827674591232/OBzjRIZ4_400x400.jpg",
    tweetUrl: "https://x.com/visegrad24/status/2075470278621065366"
  },
  {
    id: "2082921585472643105",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "Police officer panics as she is unable to arrest a man.",
    likes: 1400,
    reposts: 182,
    views: 68000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2082921585472643105"
  },
  {
    id: "2066292267682304430",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "Black man tells police to f*ck off... and they do!",
    likes: 7300,
    reposts: 1500,
    views: 1100000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2066292267682304430"
  },
  {
    id: "2077145657932968156",
    author: "Russian Garbage Human",
    handle: "@RusGarbageHuman",
    content: "The police officer walks straight past the armed foreigners and attacks the native holding some sticks. You should be coming up to such officers, recording his face, voice and collar number.",
    likes: 714,
    reposts: 72,
    views: 8196,
    avatarUrl: "https://pbs.twimg.com/profile_images/2008318949448892417/v7L-39OP_400x400.jpg",
    tweetUrl: "https://x.com/RusGarbageHuman/status/2077145657932968156"
  },
  {
    id: "2086203543623455106",
    author: "Brit Lad X 🇬🇧",
    handle: "@BritLadx",
    content: "So this video is doing the rounds...\n\nFrom the reports going around, this bloke had bought a baseball bat. You can literally see it’s still in the plastic packaging. (THIS APPEARS TO BE MANCHESTER)\n\nOwning a baseball bat is perfectly legal.\n\nSo what happens?\n\nA copper sees him walking with it and decides that apparently this warrants an arrest. Then, unsurprisingly, the whole thing kicks off.\n\nAnd this is exactly why people are fucking sick of it.\n\nWould everyone get treated the same way in this situation? I seriously doubt it.",
    likes: 160,
    reposts: 33,
    views: 387655,
    avatarUrl: "https://pbs.twimg.com/profile_images/1904501834577780736/vP2Ual4q_400x400.jpg",
    tweetUrl: "https://x.com/BritLadx/status/2086203543623455106"
  },
  // ===== E - DEI hires =====
  {
    id: "2073755447719248065",
    author: "J Stewart",
    handle: "@triffic_stuff_",
    content: "What on earth is this female police officer doing?! 🤨",
    likes: 11000,
    reposts: 2900,
    views: 971000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1746070412381863937/KKz4xn-u_400x400.jpg",
    tweetUrl: "https://x.com/triffic_stuff_/status/2073755447719248065"
  },
  {
    id: "2074041176559108555",
    author: "UNN",
    handle: "@UnityNewsNet",
    content: "British Constables are taught to hate the people.\n\nDon't trust them.\n\nDon't consent to them.",
    likes: 3100,
    reposts: 808,
    views: 369000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1133287235531485190/BdNIkUda_400x400.jpg",
    tweetUrl: "https://x.com/UnityNewsNet/status/2074041176559108555"
  },
  {
    id: "2071297092136431711",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "Diversity, equity, and inclusion (DEI) hiring within the Police has reached a new all time high 😅",
    likes: 9,
    reposts: 4,
    views: 3750,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2071297092136431711"
  },
  {
    id: "2086139748607836477",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "West Midlands Police with yet another entry for the DEI category of the YooKay Police Madness Index 🏆",
    likes: 25,
    reposts: 8,
    views: 6633,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2086139748607836477"
  },
  {
    id: "2091138597143388377",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "In Birmingham, Police responded to reports of antisocial behaviour by:\n\n- sending a lone female\n- who was too scared to get out of her van\n- but did make it known she was recording\n\nThank-you DEI for making this possible 🤦‍♂️",
    likes: 1626,
    reposts: 305,
    views: 111244,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2091138597143388377"
  },
  {
    id: "2090523016262283657",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "A couple of crackheads - adult men on pushbikes with drawstring bags from JD sports - evade capture from local police.\n\nAm I alone in feeling for the officer who face plants?\n\nHis colleagues - the DEI female and a dude who runs like crusty the clown - are nowhere to be seen 🐌",
    likes: 8,
    reposts: 0,
    views: 7070,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2090523016262283657"
  },
  // ===== NEW (sheet rows 30-40) =====
  {
    id: "2098877732213997734",
    author: "Jonathan Wong",
    handle: "@WONGthink",
    content: "Portsmouth protest. One event. Two sides. Two-tier policing.",
    likes: 635,
    reposts: 157,
    views: 37800,
    avatarUrl: "https://pbs.twimg.com/profile_images/2082898152483393536/vQ2l0IIH_400x400.jpg",
    tweetUrl: "https://x.com/WONGthink/status/2098877732213997734"
  },
  {
    id: "2098766830630252816",
    author: "Rare | ♻️🇬🇧",
    handle: "@RareRestore",
    content: "This lot couldn't put a child on a naughty step.",
    likes: 718,
    reposts: 64,
    views: 250700,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareRestore/status/2098766830630252816"
  },
  {
    id: "2097813829119877624",
    author: "The media SOI",
    handle: "@MediaSOI",
    content: "Is this acceptable police conduct?",
    likes: 680,
    reposts: 280,
    views: 73700,
    avatarUrl: "https://pbs.twimg.com/profile_images/2074137677620768768/yeoj3BGI_400x400.jpg",
    tweetUrl: "https://x.com/MediaSOI/status/2097813829119877624"
  },
  {
    id: "2097408698175873364",
    author: "John Spandli",
    handle: "@BentexTv",
    content: "Friendly fire 🤣",
    likes: 569,
    reposts: 147,
    views: 79800,
    avatarUrl: "https://pbs.twimg.com/profile_images/1882229488697610240/nNRgaq78_400x400.jpg",
    tweetUrl: "https://x.com/BentexTv/status/2097408698175873364"
  },
  {
    id: "2086537720223199233",
    author: "WesleyWinter",
    handle: "@WesleyWinterYT",
    content: "A Polish mother was arrested after refusing to leave her 13 year old son unattended with a police officer in Liverpool.",
    likes: 40000,
    reposts: 10000,
    views: 1800000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1819197190864060417/0P2I69lm_400x400.jpg",
    tweetUrl: "https://x.com/WesleyWinterYT/status/2086537720223199233"
  },
  {
    id: "2093794458387255557",
    author: "British Patriot 🇬🇧",
    handle: "@EnglandUK",
    content: "Badge doesn’t make you the main character.",
    likes: 2500,
    reposts: 632,
    views: 222222,
    avatarUrl: "https://pbs.twimg.com/profile_images/2088949132018720768/DcK2hTa-_400x400.jpg",
    tweetUrl: "https://x.com/EnglandUK/status/2093794458387255557"
  },
  {
    id: "2094138273782243392",
    author: "My Brakes Don't Work",
    handle: "@mybrakedontwork",
    content: "Two Tier Police let antifa go",
    likes: 2100,
    reposts: 640,
    views: 506300,
    avatarUrl: "https://pbs.twimg.com/profile_images/2093719899071709184/23t7VIWF_400x400.jpg",
    tweetUrl: "https://x.com/mybrakedontwork/status/2094138273782243392"
  },
  {
    id: "2095114078167441768",
    author: "Driftwood",
    handle: "@buc97552",
    content: "Six Hertfordshire police officers deployed over a WhatsApp group chat",
    likes: 833,
    reposts: 322,
    views: 51500,
    avatarUrl: "https://pbs.twimg.com/profile_images/2033994598561759233/uyHgffAk_400x400.jpg",
    tweetUrl: "https://x.com/buc97552/status/2095114078167441768"
  },
  {
    id: "2095659742236708973",
    author: "Retard Finder",
    handle: "@IfindRetards",
    content: "A man in the UK was tackled to the ground and arrested for calling a cop a \"clown\"",
    likes: 15000,
    reposts: 2200,
    views: 466100,
    avatarUrl: "https://pbs.twimg.com/profile_images/2005562609798725632/FV0GDw3C_400x400.jpg",
    tweetUrl: "https://x.com/IfindRetards/status/2095659742236708973"
  },
  {
    id: "2096248868987924590",
    author: "The Nationalist GB",
    handle: "@TheNatGB",
    content: "Meanwhile, in Croydon.",
    likes: 960,
    reposts: 198,
    views: 82800,
    avatarUrl: "https://pbs.twimg.com/profile_images/2096182302208663552/NUTN79Cq_400x400.jpg",
    tweetUrl: "https://x.com/TheNatGB/status/2096248868987924590"
  },
  {
    id: "2096530896933269653",
    author: "The British Patriot",
    handle: "@TheBritLad",
    content: "This is police brutality.",
    likes: 896,
    reposts: 386,
    views: 44900,
    avatarUrl: "https://pbs.twimg.com/profile_images/2034218560768385024/nxbIRriv_400x400.jpg",
    tweetUrl: "https://x.com/TheBritLad/status/2096530896933269653"
  },  // ===== NEW (sheet rows 41-55) =====
  {
    id: "2110752884295917766",
    author: "Concerned Citizen",
    handle: "@BGatesIsaPyscho",
    content: "Man in Bury stares at police for 2 seconds and is accosted by officers, having to justify his entire existence.",
    likes: 2728,
    reposts: 660,
    views: 128825,
    avatarUrl: "https://pbs.twimg.com/profile_images/1534905804368879621/R5xYZeL5_400x400.jpg",
    tweetUrl: "https://x.com/BGatesIsaPyscho/status/2110752884295917766"
  },
  {
    id: "2110626224955416776",
    author: "Rare | ♻️🇬🇧",
    handle: "@RareRestore",
    content: "Meanwhile, in Dudley, West Midlands Police remove an irritating bystander from the scene of arrest.",
    likes: 1104,
    reposts: 107,
    views: 323114,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareRestore/status/2110626224955416776"
  },
  {
    id: "2108482972139552920",
    author: "Oldspeak Bookshop 📚",
    handle: "@oldspeak_books",
    content: "A policeman came round my house this morning.\nBecause of a post I didn’t even put up.\nSurely people must have better things to do??",
    likes: 10647,
    reposts: 2046,
    views: 841397,
    avatarUrl: "https://pbs.twimg.com/profile_images/2082014057314295808/31gdH3KG_400x400.jpg",
    tweetUrl: "https://x.com/oldspeak_books/status/2108482972139552920"
  },
  {
    id: "2112551367537508483",
    author: "Tommy Robinson 🇬🇧",
    handle: "@TRobinsonNewEra",
    content: "Our young can't even go to college in cities like Coventry anymore because of vile fucks like this carrying weapons.",
    likes: 40926,
    reposts: 5942,
    views: 4234900,
    avatarUrl: "https://pbs.twimg.com/profile_images/2007262159403671552/-DltTmcT_400x400.jpg",
    tweetUrl: "https://x.com/TRobinsonNewEra/status/2112551367537508483"
  },
  {
    id: "2096604154282008580",
    author: "WeGotitBack 🏴󠁧󠁢󠁥󠁮󠁧󠁿🇬🇧🇺🇸",
    handle: "@NotFarLeftAtAll",
    content: "Police officers refuse to buckle or be intimidated by the racism card.",
    likes: 4041,
    reposts: 444,
    views: 324988,
    avatarUrl: "https://pbs.twimg.com/profile_images/1889657050629632000/Pxr-VZ9l_400x400.jpg",
    tweetUrl: "https://x.com/NotFarLeftAtAll/status/2096604154282008580"
  },
  {
    id: "2098943750458195980",
    author: "Gauci Reports",
    handle: "@GauciReports",
    content: "Two-tier policing: anti-migrant protester in a niqab arrested, counter-protester wearing the same ignored.",
    likes: 4657,
    reposts: 1895,
    views: 57180,
    avatarUrl: "https://pbs.twimg.com/profile_images/1969735649927258112/QOqTtlOO_400x400.jpg",
    tweetUrl: "https://x.com/GauciReports/status/2098943750458195980"
  },
  {
    id: "2099233404822909433",
    author: "The White Rabbit",
    handle: "@TheWyteRabbit1",
    content: "Uk police quote of the year …”he’s breaking the law so what am I supposed to do “ .",
    likes: 51064,
    reposts: 7368,
    views: 3064999,
    avatarUrl: "https://pbs.twimg.com/profile_images/2054404587839225857/o-VCrqec_400x400.jpg",
    tweetUrl: "https://x.com/TheWyteRabbit1/status/2099233404822909433"
  },
  {
    id: "2100877775796150415",
    author: "HJB News",
    handle: "@HJB_News__",
    content: "In the UK they now have children policing the streets.",
    likes: 3109,
    reposts: 650,
    views: 257997,
    avatarUrl: "https://pbs.twimg.com/profile_images/2006926965429723136/nuuCSsTe_400x400.jpg",
    tweetUrl: "https://x.com/HJB_News__/status/2100877775796150415"
  },
  {
    id: "2102333390313627910",
    author: "WeGotitBack 🏴󠁧󠁢󠁥󠁮󠁧󠁿🇬🇧🇺🇸",
    handle: "@NotFarLeftAtAll",
    content: "Excessive force or just the right amount of force",
    likes: 1880,
    reposts: 152,
    views: 71092,
    avatarUrl: "https://pbs.twimg.com/profile_images/1889657050629632000/Pxr-VZ9l_400x400.jpg",
    tweetUrl: "https://x.com/NotFarLeftAtAll/status/2102333390313627910"
  },
  {
    id: "2102867750385279412",
    author: "TheEnglishPatriot",
    handle: "@TheEnglishPat",
    content: "Police turn up for two men with cameras outside a migrant hotel, but where are they when a home is broken into?",
    likes: 760,
    reposts: 269,
    views: 31895,
    avatarUrl: "https://pbs.twimg.com/profile_images/2089326902355861504/4HaoTQ0u_400x400.jpg",
    tweetUrl: "https://x.com/TheEnglishPat/status/2102867750385279412"
  },
  {
    id: "2104883958961823791",
    author: "Driftwood",
    handle: "@buc97552",
    content: "Henry Nowak’s murderer was never handcuffed, but 8 year old boys fishing without a valid permit are. \n\nPenny dropping yet?",
    likes: 90969,
    reposts: 19985,
    views: 1876423,
    avatarUrl: "https://pbs.twimg.com/profile_images/2033994598561759233/uyHgffAk_400x400.jpg",
    tweetUrl: "https://x.com/buc97552/status/2104883958961823791"
  },
  {
    id: "2105022039388242100",
    author: "WWG1WGA🇺🇸♥️",
    handle: "@WWG1WGA_QQ",
    content: "British police arrest two young children, one with special needs and the other with ADHD.",
    likes: 1975,
    reposts: 922,
    views: 28790,
    avatarUrl: "https://pbs.twimg.com/profile_images/2037265333661130752/5hEh7IIO_400x400.jpg",
    tweetUrl: "https://x.com/WWG1WGA_QQ/status/2105022039388242100"
  },
  {
    id: "2106677050480210424",
    author: "Sedd",
    handle: "@SeddSezz",
    content: "It took 15 officers to apprehend one knife-wielding weasel, and one pepper sprayed himself while another tripped.",
    likes: 1389,
    reposts: 493,
    views: 39766,
    avatarUrl: "https://pbs.twimg.com/profile_images/2100337136973082625/oEkk9qyC_400x400.jpg",
    tweetUrl: "https://x.com/SeddSezz/status/2106677050480210424"
  },
  {
    id: "1718174862194225648",
    author: "Ashlea Simon",
    handle: "@AshleaSimonAFE",
    content: "Officer down as several officers struggle to cuff one man in the Midlands. Just tase him and watch him drop 😡😡",
    likes: 593,
    reposts: 184,
    views: 41830,
    avatarUrl: "https://pbs.twimg.com/profile_images/2076045685720322048/6uZzJYPI_400x400.jpg",
    tweetUrl: "https://x.com/AshleaSimonAFE/status/1718174862194225648"
  },
];
const tiers = ['S', 'A', 'B', 'C', 'D', 'E', 'P'];
const allTiers = [...tiers, 'DISCARD'];
const defaultTier: Record<string, Tweet[]> = {
  S: [initialTweets[0], initialTweets[1], initialTweets[2], initialTweets[45]],
  A: [
    initialTweets[3], initialTweets[4], initialTweets[5], initialTweets[6], initialTweets[7],
    initialTweets[30], initialTweets[32], initialTweets[38],
    initialTweets[49], initialTweets[50],
  ],
  B: [
    initialTweets[8], initialTweets[9], initialTweets[10], initialTweets[11], initialTweets[12],
    initialTweets[33], initialTweets[35], initialTweets[36],
    initialTweets[39], initialTweets[41], initialTweets[46], initialTweets[48],
  ],
  C: [
    initialTweets[13], initialTweets[14], initialTweets[15], initialTweets[16], initialTweets[27],
    initialTweets[29], initialTweets[31],
    initialTweets[40], initialTweets[51], initialTweets[52],
  ],
  D: [
    initialTweets[17], initialTweets[18], initialTweets[19], initialTweets[20], initialTweets[21],
    initialTweets[28], initialTweets[34], initialTweets[37],
    initialTweets[44],
  ],
  E: [initialTweets[22], initialTweets[23], initialTweets[24], initialTweets[25], initialTweets[26]],
  P: [initialTweets[42], initialTweets[43], initialTweets[47]],
  DISCARD: [],
};
const defaultTitles: Record<string, string> = {
  S: 'Anti-white Racism',
  A: 'Violent Policing',
  B: 'Thought Police',
  C: 'Failed Arrest',
  D: 'Two Tier Policing',
  E: 'DEI hires',
  P: 'Proper Policing',
  DISCARD: 'Discard Pile',
};
const tierStyles: Record<string, string> = {
  S: 'bg-red-950/40 border-red-600',
  A: 'bg-orange-950/40 border-orange-500',
  B: 'bg-yellow-950/30 border-yellow-500',
  C: 'bg-green-950/30 border-green-500',
  D: 'bg-blue-950/30 border-blue-500',
  E: 'bg-purple-950/30 border-purple-500',
  P: 'bg-pink-950/30 border-pink-500',
  DISCARD: 'bg-gray-900/60 border-gray-500',
};
const tierColors: Record<string, string> = {
  S: '#dc2626',
  A: '#f97316',
  B: '#eab308',
  C: '#22c55e',
  D: '#3b82f6',
  E: '#a855f7',
  P: '#ec4899',
  DISCARD: '#6b7280',
};
function encodeState(tierLists: Record<string, Tweet[]>, tierTitles: Record<string, string>) {
  const payload = {
    t: Object.fromEntries(
      Object.entries(tierLists).map(([k, tweets]) => [k, tweets.map(t => t.id)])
    ),
    titles: tierTitles,
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}
function decodeState(encoded: string): { tierLists: Record<string, Tweet[]>; tierTitles: Record<string, string> } | null {
  try {
    const payload = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    const newLists: Record<string, Tweet[]> = { DISCARD: [] };
    for (const tier of tiers) {
      const ids: string[] = payload.t[tier] || [];
      newLists[tier] = ids
        .map(id => initialTweets.find(t => t.id === id))
        .filter(Boolean) as Tweet[];
    }
    return {
      tierLists: newLists,
      tierTitles: { ...defaultTitles, ...payload.titles },
    };
  } catch {
    return null;
  }
}
function TierListApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tierLists, setTierLists] = useState<Record<string, Tweet[]>>(defaultTier);
  const [tierTitles, setTierTitles] = useState<Record<string, string>>(defaultTitles);
  const [isEditing, setIsEditing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cleanRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    const encoded = searchParams.get('s');
    if (encoded) {
      const decoded = decodeState(encoded);
      if (decoded) {
        setTierLists(decoded.tierLists);
        setTierTitles(decoded.tierTitles);
        setIsShared(true);
      }
    }
  }, [searchParams]);
  useEffect(() => {
    if (!isDragging) {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
      return;
    }
    const EDGE = 100;
    const SPEED = 12;
    const handleDragOver = (e: DragEvent) => {
      const y = e.clientY;
      const h = window.innerHeight;
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
      if (y < EDGE) {
        scrollInterval.current = setInterval(() => window.scrollBy(0, -SPEED), 16);
      } else if (y > h - EDGE) {
        scrollInterval.current = setInterval(() => window.scrollBy(0, SPEED), 16);
      }
    };
    const stopScroll = () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    };
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragend', stopScroll);
    window.addEventListener('drop', stopScroll);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragend', stopScroll);
      window.removeEventListener('drop', stopScroll);
      stopScroll();
    };
  }, [isDragging]);
  const onDragStart = (e: React.DragEvent, tweet: Tweet, fromTier: string) => {
    e.dataTransfer.setData('tweet', JSON.stringify(tweet));
    e.dataTransfer.setData('fromTier', fromTier);
    setIsDragging(true);
  };
  const onDrop = (e: React.DragEvent, toTier: string) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isEditing) return;
    const tweet = JSON.parse(e.dataTransfer.getData('tweet'));
    const fromTier = e.dataTransfer.getData('fromTier');
    if (fromTier === toTier) return;
    setTierLists(prev => {
      const newLists = { ...prev };
      newLists[fromTier] = newLists[fromTier].filter(t => t.id !== tweet.id);
      newLists[toTier] = [...newLists[toTier], tweet];
      return newLists;
    });
  };
  const onDragOver = (e: React.DragEvent) => {
    if (isEditing) e.preventDefault();
  };
  const onDragEnd = () => setIsDragging(false);
  const moveToDiscard = (tweet: Tweet, fromTier: string) => {
    if (!isEditing) return;
    setTierLists(prev => {
      const newLists = { ...prev };
      newLists[fromTier] = newLists[fromTier].filter(t => t.id !== tweet.id);
      newLists['DISCARD'] = [...newLists['DISCARD'], tweet];
      return newLists;
    });
  };
  const scroll = (tier: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[tier];
    if (container) {
      container.scrollBy({ left: direction === 'right' ? 280 : -280, behavior: 'smooth' });
    }
  };
  const handleTitleChange = (tier: string, value: string) => {
    setTierTitles(prev => ({ ...prev, [tier]: value }));
  };
  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
    setEditingTier(null);
  };
  const handleViewOriginal = () => {
    setTierLists(defaultTier);
    setTierTitles(defaultTitles);
    setIsEditing(false);
    setIsShared(false);
    setEditingTier(null);
    router.push('/');
  };
  const handleShareImage = async () => {
    if (isEditing) {
      setIsEditing(false);
      setEditingTier(null);
    }
    if (!cleanRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cleanRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#000000',
      });
      const link = document.createElement('a');
      link.download = 'uk-police-on-x.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('Download failed — try again');
    } finally {
      setIsDownloading(false);
    }
  };
  const hasChanges = () => {
    for (const tier of tiers) {
      if (tierTitles[tier] !== defaultTitles[tier]) return true;
    }
    for (const tier of tiers) {
      const currentIds = tierLists[tier].map(t => t.id).join(',');
      const defaultIds = defaultTier[tier].map(t => t.id).join(',');
      if (currentIds !== defaultIds) return true;
    }
    if (tierLists['DISCARD'].length > 0) return true;
    return false;
  };
  const handleShareLink = async () => {
    if (isEditing) {
      setIsEditing(false);
      setEditingTier(null);
    }
    const url = hasChanges()
      ? `${window.location.origin}/?s=${encodeState(tierLists, tierTitles)}`
      : 'https://bit.ly/UK-Police-On-X';
    try {
      await navigator.clipboard.writeText(url);
      setShareMessage('Link copied to clipboard!');
      setTimeout(() => setShareMessage(null), 3000);
    } catch {
      prompt('Copy this link:', url);
    }
  };
  const visibleTiers = isEditing ? allTiers : tiers;
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">🇬🇧 UK Police on X 🇬🇧</h1>
          <p className="text-gray-400 mb-6">👮 YooKay Police doing a madness 👮</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={handleToggleEdit}
              className="px-5 py-3 rounded-xl font-semibold text-white transition-all"
              style={{ backgroundColor: tierColors.A }}
            >
              {isEditing ? 'Finish editing ✅' : 'Edit this list 🔧'}
            </button>
            <button
              onClick={handleShareImage}
              disabled={isDownloading}
              className="px-5 py-3 rounded-xl font-semibold text-black transition-all disabled:opacity-50"
              style={{ backgroundColor: tierColors.B }}
            >
              {isDownloading
                ? 'Generating…'
                : isEditing
                ? 'Finish and Share 📸'
                : 'Share 📸'}
            </button>
            <button
              onClick={handleShareLink}
              className="px-5 py-3 rounded-xl font-semibold text-white transition-all"
              style={{ backgroundColor: tierColors.C }}
            >
              {isEditing ? 'Finish and Share 🔗' : 'Share 🔗'}
            </button>
            {isShared && (
              <button
                onClick={handleViewOriginal}
                className="px-5 py-3 rounded-xl font-semibold text-white transition-all"
                style={{ backgroundColor: tierColors.D }}
              >
                View original
              </button>
            )}
          </div>
          {shareMessage && (
            <p className="mt-4 text-sm text-green-400 font-medium">{shareMessage}</p>
          )}
          {isEditing && (
            <p className="mt-4 text-sm text-yellow-400">
              Editing mode — drag cards, click titles to rename, or use ✕ to discard
            </p>
          )}
        </div>
        <div className="space-y-5">
          {visibleTiers.map(tier => (
            <div
              key={tier}
              onDrop={(e) => onDrop(e, tier)}
              onDragOver={onDragOver}
              className={`border-l-8 rounded-2xl p-4 transition-all ${tierStyles[tier]} ${
                isEditing ? 'ring-2 ring-white/20' : ''
              }`}
            >
              <div className="flex items-center gap-5 mb-4">
                <div className="text-6xl font-black leading-none w-16 flex-shrink-0 flex items-center justify-center">
                  {tier === 'DISCARD' ? '🗑️' : tier}
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing && editingTier === tier && tier !== 'DISCARD' ? (
                    <input
                      autoFocus
                      value={tierTitles[tier]}
                      onChange={(e) => handleTitleChange(tier, e.target.value)}
                      onBlur={() => setEditingTier(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setEditingTier(null);
                      }}
                      className="w-full bg-black/40 border border-white/30 rounded-lg px-3 py-2 text-xl font-semibold text-white focus:outline-none focus:border-white"
                      maxLength={40}
                    />
                  ) : (
                    <div
                      onClick={() => isEditing && tier !== 'DISCARD' && setEditingTier(tier)}
                      className={`text-xl font-semibold truncate ${
                        isEditing && tier !== 'DISCARD'
                          ? 'cursor-pointer hover:text-white/80 border-b border-dashed border-white/30 pb-0.5'
                          : ''
                      }`}
                    >
                      {tierTitles[tier] || 'Untitled'}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative min-w-0">
                {tierLists[tier].length > 3 && (
                  <button
                    onClick={() => scroll(tier, 'left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white text-xl"
                  >
                    ‹
                  </button>
                )}
                <div
                  ref={(el) => { scrollRefs.current[tier] = el; }}
                  className="flex gap-4 overflow-x-auto scrollbar-hide py-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {tierLists[tier].map(tweet => (
                    <div
                      key={tweet.id}
                      draggable={isEditing}
                      onDragStart={(e) => onDragStart(e, tweet, tier)}
                      onDragEnd={onDragEnd}
                      className={`relative bg-[#1f2429] border border-[#2f3336] rounded-xl p-4 w-60 flex-shrink-0 ${
                        isEditing ? 'cursor-grab active:cursor-grabbing' : ''
                      }`}
                    >
                      {isEditing && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveToDiscard(tweet, tier);
                          }}
                          className="absolute top-2 right-2 z-10 w-7 h-7 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                          title="Move to Discard Pile"
                        >
                          ✕
                        </button>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={tweet.avatarUrl}
                          alt={tweet.author}
                          className="w-9 h-9 rounded-full object-cover flex-shrink-0 bg-gray-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm truncate">{tweet.author}</div>
                          <div className="text-xs text-gray-500 truncate">{tweet.handle}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-200 line-clamp-3 mb-3 whitespace-pre-line">
                        {tweet.content}
                      </p>
                      <img
                        src={`/images/${tweet.id}.png`}
                        alt="Evidence"
                        className="w-full aspect-square object-cover rounded-lg mb-3 bg-gray-800"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex gap-3 text-gray-500">
                          <span>❤️ {tweet.likes.toLocaleString()}</span>
                          <span>🔁 {tweet.reposts.toLocaleString()}</span>
                        </div>
                        <a
                          href={tweet.tweetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on X →
                        </a>
                      </div>
                    </div>
                  ))}
                  {tierLists[tier].length === 0 && (
                    <div className="text-gray-600 text-sm italic py-8 pl-2">
                      {tier === 'DISCARD' ? 'Discarded cards appear here' : 'Drop cards here'}
                    </div>
                  )}
                </div>
                {tierLists[tier].length > 3 && (
                  <button
                    onClick={() => scroll(tier, 'right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white text-xl"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 pb-6 text-gray-400 text-sm">
          Questions —{' '}
          <a
            href="https://x.com/RareRestore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            DM @RareRestore
          </a>
        </div>
      </div>
      <div className="fixed -left-[9999px] top-0">
        <div ref={cleanRef} className="bg-black p-8 w-[900px]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">🇬🇧 UK Police on X 🇬🇧</h1>
            <p className="text-gray-400 mt-1">👮 YooKay Police doing a madness 👮</p>
          </div>
          <div className="space-y-5">
            {tiers.map(tier => (
              <div key={tier} className="flex items-start gap-3">
                <div
                  className="w-24 h-24 flex-shrink-0 rounded-xl flex flex-col items-center justify-center text-center px-1"
                  style={{
                    backgroundColor: tierColors[tier] + '33',
                    border: `2px solid ${tierColors[tier]}`,
                  }}
                >
                  <div className="text-3xl font-black leading-none" style={{ color: tierColors[tier] }}>
                    {tier}
                  </div>
                  <div className="text-[10px] font-medium text-white/90 mt-1 leading-tight break-words w-full px-0.5">
                    {tierTitles[tier]}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {tierLists[tier].map(tweet => (
                    <div key={tweet.id} className="w-24 text-center">
                      <img
                        src={`/images/${tweet.id}.png`}
                        alt=""
                        className="w-24 h-24 object-cover rounded-xl mb-1 bg-gray-800"
                      />
                      <div className="text-[11px] text-gray-300 truncate">{tweet.handle}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 text-gray-500 text-sm space-y-1">
            <div>Make your own → bit.ly/UK-Police-On-X (case sensitive)</div>
            <div>Questions — DM @RareRestore on X</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    }>
      <TierListApp />
    </Suspense>
  );
}

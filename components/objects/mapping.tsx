// ジャンルのマッピングを定義
type GenreMapping = {
  [key: string]: string;
};

const genreMapping: GenreMapping = {
  MUSIC: "音楽",
  SPORTS: "スポーツ",
  EDUCATION: "教育",
  ENTERTAINMENT: "エンターテインメント",
  OTHER: "その他",
};

export default genreMapping;

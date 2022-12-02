export interface SelectItemProps {
  category: string;
  completion: boolean;
  deadLine: string;
  nickname: string;
  options: string[];
  selectKey: number;
  title: string;
  total: number;
}

export interface DetailItemProps {
  category: string;
  completion: boolean;
  deadLine: string;
  image: string[];
  nickname: string;
  options: string[];
  point: number;
  selectKey: number;
  title: string;
  userKey: number;
}

export interface RecommentItemProps {
  User: {
    nickname: string;
    point: number;
  };
  comment: string;
  commentKey: number;
  createdAt: string;
  recommentKey: number;
  updatedAt: string;
  userKey: number;
}

export interface CommentItemProps {
  comment: string;
  commentKey: number;
  nickname: string;
  point: number;
  recomment: RecommentItemProps[];
  updatedAt: string;
  userKey: number;
}

export interface VoteResultProps {
  msg: string;
  ok: boolean;
  result: {
    [num: number]: number;
    total: number;
    isVote?: number;
  };
}

export interface LocationState {
  state: {
    now: string;
  };
}

export interface IRequestSlice {
	skip: number;
	take: number;
}

export type ReviewId = { reviewId: number }

export interface IBody<T> extends Express.Request { body: T }

export interface ILike {
	reviewsId: number;
	userId?: number;
	isLike: boolean; 
}

export interface IRequestByTwoId {
	reviewId: number;
	userId: number;
}

export interface IResponseDB {
	body: any | null;
	error: boolean;
}
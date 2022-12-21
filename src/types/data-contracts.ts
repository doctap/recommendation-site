export interface IReview {
	id: number;
	title: string;
	text: string;
	name_work: string;
	type: string;
	tags: string;
	image: string; //File
	author_rating: number;
	likes: number;
	user_id: number;
}

export interface IRequestSlice {
	skip: number;
	take: number;
}

export interface IRegisterUser {
	token?: string;
	firstName?: string;
	lastName?: string;
	sub?: string;
	id?: number;
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

export interface IResponseDB<T> {
	body: T[];
	error: boolean;
}

export interface IResponseRegister {
	isRegistered: boolean;
	isExist: boolean;
}
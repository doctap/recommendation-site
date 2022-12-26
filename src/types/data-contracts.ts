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
	average_rating: string;
}

export interface IRequestSlice {
	skip: number;
	take: number;
}

export interface IUserData {
	admin?: boolean;
	token: string;
	data_user?: IUser;
	isAuthenticated?: boolean;
}

export interface IUser {
	name?: string;
	given_name?: string;
	family_name?: string;
	middle_name?: string;
	nickname?: string;
	preferred_username?: string;
	profile?: string;
	picture?: string;
	website?: string;
	email?: string;
	email_verified?: boolean;
	gender?: string;
	birthdate?: string;
	zoneinfo?: string;
	locale?: string;
	phone_number?: string;
	phone_number_verified?: boolean;
	address?: string;
	updated_at?: string;
	sub?: string;
}

export type ReviewId = { review_id: number }

export interface IBody<T> extends Express.Request { body: T }

export interface ILike {
	review_id: number;
	sub?: string;
	user_likes_it: boolean; 
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

export interface IRate {
	review_id: number;
	sub?: string;
	user_rating: number;
}
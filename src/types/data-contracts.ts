export interface IRequestById {
	skip: number;
	take: number;
}

export interface IRequestByTwoId {
	reviewId: number;
	userId: number;
}

export interface IResponseDB {
	body: any | null;
	error: boolean;
}
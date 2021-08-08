export type ServerUserInfoResponse = {
	loggedIn: boolean;
	email?: string;
};

export type ServerUserSlidesResponse = {
	id: string;
	title: string;
	coverUrl: string;
	uploaded: number;
}[];

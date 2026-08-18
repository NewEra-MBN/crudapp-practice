// export interface TokeResponse {
//     token: string;
//     expires: Data;
// }


// export interface AuthTokenResponse{
//     access: TokeResponse;
//     refresh?: TokeResponse;
// }




export interface TokenResponse {
    token: string;
    expires: Date;
}


export interface AuthTokenResponse{
    access: TokenResponse;
    refresh?:TokenResponse;
}
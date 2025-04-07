import { doPost } from "@/lib/axios";
import { TLogin, TLoginResponse } from "@/schemas/login.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk<TLoginResponse, TLogin>(
  "loginUser",
  async (data) => {
    try {
      const response = await doPost(`/login`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const loginWithFacebook = createAsyncThunk<
  TLoginResponse,
  {
    data: { token: string };
    callback?: () => void;
  }
>("loginWithFacebook", async ({ data, callback }) => {
  try {
    const response = await doPost(`/auth/facebook/callback`, data);
    callback && callback();
    return response;
  } catch (error: any) {
    throw error;
  }
});

export interface GoogleUserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export const fetchGoogleProfile = async (
  token: string
): Promise<GoogleUserProfile> => {
  if (!token) {
    throw new Error("No token provided");
  }

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data: GoogleUserProfile = await response.json();
  return data;
};

export const loginWithGoogle = createAsyncThunk<
  TLoginResponse,
  {
    data: { token: string };
    callback?: () => void;
  }
>("loginWithGoogle", async ({ data, callback }) => {
  try {
    const googleProfile = await fetchGoogleProfile(data.token);

    const loginPayload = {
      provider_id: googleProfile.id,
      email: googleProfile.email,
      name: googleProfile.name,
      avatar_url: googleProfile.picture,
    };
    const response = await doPost(`/auth/google/callback`, loginPayload);
    callback && callback();
    return response;
  } catch (error: any) {
    throw error;
  }
});

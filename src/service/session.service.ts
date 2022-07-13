import {get} from 'lodash';
import { FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import SessionModel, { SessionDocument } from "../models/session.model"
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from './user.service';


export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({user: userId, userAgent});

    return session.toJSON();
}

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
    return SessionModel.find(query).lean();
};
// .lean() means that find(query) is not going to return all the functions in d object,
// it's just going to return d plain old object, same as toJSON()

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
    return SessionModel.updateOne(query, update);
};

export const reIssueAccessToken = async ({refreshToken}: {refreshToken: string}) => {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"))

    if(!session || !session.valid) return false;

    const user = await findUser({_id : session.user});

    if(!user) return false;

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    return accessToken;
}
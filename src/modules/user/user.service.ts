import { compare, hash } from 'bcrypt';
import HttpException from '../../exceptions/http.exception';
import ServerException from '../../exceptions/server.exception';
import WrongCredentialException from '../../exceptions/wrongCredential.exception';
import { TokenType } from '../../interfaces/jwtToken.interface';
import Service from '../../interfaces/service';
import { issueToken } from '../../utils/jwt';
import EditUserDto from './dto/editUser.dto';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import User from './user.interface';
import userModel from './user.model';

class UserService implements Service {
    private userModel = userModel;
    public async register(userData: RegisterDto) {
        try {
            if (await this.userModel.findOne({ email: userData.email })) {
                throw new HttpException(400, 'Email already exist');
            }
            const hashedPass = await hash(userData.password, 12);
            const newUser = await this.userModel.create({
                ...userData,
                password: hashedPass,
            });

            return await newUser.save();
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            } else throw new HttpException(500, 'Internal server error');
        }
    }

    public login = async (loginData: LoginDto) => {
        try {
            const userData = await this.userModel.findOne({
                email: loginData.email,
            });
            if (!userData) throw new WrongCredentialException();
            const isPasswordMatch = await compare(
                loginData.password,
                userData.get('password', null, { getters: false })
            );
            if (!isPasswordMatch) throw new WrongCredentialException();

            return this.getToken(userData);
        } catch (err) {
            console.log({ serviceError: err });
            if (err instanceof WrongCredentialException) throw err;
            else throw new HttpException(500, 'Internal server error');
        }
    };

    public getAllUser = async () => {
        try {
            return await this.userModel.find();
        } catch (error) {
            throw new ServerException();
        }
    };
    public editUser = async (editUserData: EditUserDto) => {
        try {
            return await this.userModel.findByIdAndUpdate(
                editUserData.id,
                editUserData,
                { new: true }
            );
        } catch (error) {
            throw new ServerException();
        }
    };
    public deleteUser = async (userId: string) => {
        try {
            return await this.userModel.findByIdAndDelete(userId);
        } catch (error) {
            throw new ServerException();
        }
    };

    private getToken = async (newUserData: User) => {
        // const refressToken = issueToken(
        //     {
        //         _id: newUserData._id,
        //         role: newUserData.userRole,
        //         tokenType: TokenType.REFRESH,
        //     },
        //     '180d'
        // );
        const accessToken = issueToken(
            {
                _id: newUserData._id,
                role: newUserData.userRole,
                tokenType: TokenType.ACCESS,
            },
            '1d'
        );

        // await this.userModel.findOneAndUpdate(
        //     { _id: newUserData._id },
        //     { $push: { refreshTokens: refressToken } }
        // );
        return { accessToken };
    };
}

export default UserService;

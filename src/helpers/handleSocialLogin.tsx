import { FirebaseError } from 'firebase/app';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { SignInType } from '../types/SignIn.types';
import { SignUpType } from '../types/SignUp.types';
import { UserCredential } from 'firebase/auth';

const handleSocialLogin = async (
    signInProvider: () => Promise<UserCredential | undefined>,
    validationErrors: SignInType | SignUpType,
    setValidationErrors: React.Dispatch<React.SetStateAction<SignInType | SignUpType>>,
) => {
    try {
        const res = await signInProvider();

        if (!res) return;

        const user = res.user;

        if (!user.displayName) return;

        const displayName = user.displayName.split(' ');

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot) return;

        await addDoc(usersRef, {
            uid: user.uid,
            authProvider: 'social',
            email: user.email,
            firstName: displayName[0],
            lastName: displayName[1],
        });
    } catch (e) {
        const error = e instanceof FirebaseError;
        if (error) {
            setValidationErrors({ ...validationErrors, firebase: e.message });
            console.error(e.code);
        }
    }
};
export default handleSocialLogin;

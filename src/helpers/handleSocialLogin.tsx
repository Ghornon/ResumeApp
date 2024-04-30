import { FirebaseError } from 'firebase/app';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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

        console.log(user);

        const usersRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(usersRef);

        if (userSnap.exists()) return;

        await setDoc(usersRef, {
            uid: user.uid,
            authProvider: 'social',
            email: user.email,
            firstName: displayName[0],
            lastName: displayName[1],
            photoURL: user.photoURL,
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

import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getTemplateStylesDoc = async (templateId: string) => {
    const templatesRef = collection(db, 'templateStyles');
    const q = query(templatesRef, where('templateId', '==', templateId), limit(1));

    const querySnapshot = await getDocs(q);
    const templateStyles = querySnapshot.docs.length ? querySnapshot.docs[0].data() : {};

    return templateStyles;
};

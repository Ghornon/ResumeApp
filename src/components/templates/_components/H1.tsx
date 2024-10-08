import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import getDefaultStyleSheet from '../getDefaultStyleSheet';

const H1 = ({ children }: { children: ReactNode }) => {
    const styles = getDefaultStyleSheet();

    return <Text style={styles.h1}>{children}</Text>;
};

export default H1;

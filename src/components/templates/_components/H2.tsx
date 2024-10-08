import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import getDefaultStyleSheet from '../getDefaultStyleSheet';

const H2 = ({ children }: { children: ReactNode }) => {
    const styles = getDefaultStyleSheet();

    return <Text style={styles.h2}>{children}</Text>;
};

export default H2;

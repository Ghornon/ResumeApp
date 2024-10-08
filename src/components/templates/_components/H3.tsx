import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import getDefaultStyleSheet from '../getDefaultStyleSheet';

const H3 = ({ children }: { children: ReactNode }) => {
    const styles = getDefaultStyleSheet();

    return <Text style={styles.h3}>{children}</Text>;
};

export default H3;

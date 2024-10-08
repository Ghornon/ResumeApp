import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import getDefaultStyleSheet from '../getDefaultStyleSheet';

const Title = ({ children }: { children: ReactNode }) => {
    const styles = getDefaultStyleSheet();

    return <Text style={styles.title}>{children}</Text>;
};

export default Title;

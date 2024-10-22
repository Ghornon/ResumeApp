import { Text } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import getDefaultStyleSheet from '../getDefaultStyleSheet';

const Subtitle = ({ children }: { children: ReactNode }) => {
    const styles = getDefaultStyleSheet();

    return <Text style={styles.subtitle}>{children}</Text>;
};

export default Subtitle;

import { Text, StyleSheet } from '@react-pdf/renderer';
import { ReactNode } from 'react';

const Title = ({ children }: { children: ReactNode }) => {
    const styles = StyleSheet.create({
        title: {
            marginBottom: 10,
        },
    });

    return <Text style={styles.title}>{children}</Text>;
};

export default Title;

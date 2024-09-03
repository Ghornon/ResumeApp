import { Text, StyleSheet } from '@react-pdf/renderer';
import { ReactNode } from 'react';

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lato Bold',
        fontSize: 14,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
});

const Title = ({ children }: { children: ReactNode }) => (
    <Text style={styles.title}>{children}</Text>
);

export default Title;

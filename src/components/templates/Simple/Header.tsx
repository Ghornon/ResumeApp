import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeType } from '../../../types/Resume.types';
import H2 from '../_components/H2';
import Title from '../_components/Title';
import getDefaultStyleSheet from '../getDefaultStyleSheet';

const Header = ({ resumeData }: { resumeData: ResumeType }) => {
    const defaultStyles = getDefaultStyleSheet();

    const styles = StyleSheet.create({
        header: {
            paddingBottom: 40,
            position: 'relative',
        },
        container: {
            paddingBottom: 5,
        },
        contact: {
            width: '112%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: -30,
            ...defaultStyles.highlightColor,
        },
        contactItem: {
            paddingHorizontal: 10,
            paddingVertical: 10,
            color: 'white',
        },
    });

    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <Title>
                    {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
                </Title>
            </View>
            <View style={styles.container}>
                <H2>{resumeData.personalDetails.jobTitle}</H2>
            </View>
            <View style={styles.container}>
                <Text>{resumeData.summary}</Text>
            </View>

            <View style={styles.contact}>
                <Text style={styles.contactItem}>{resumeData.personalDetails.email}</Text>
                <Text style={styles.contactItem}>{resumeData.personalDetails.phone}</Text>
                <Text style={styles.contactItem}>{resumeData.personalDetails.country}</Text>
                <Text style={styles.contactItem}>{resumeData.personalDetails.city}</Text>
            </View>
        </View>
    );
};

export default Header;

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeType } from '../../../types/Resume.types';
import Title from '../_components/Title';
import getDefaultStyleSheet from '../getDefaultStyleSheet';
import H1 from '../_components/H1';

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
            lineHeight: 1,
            paddingHorizontal: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: -30,
            ...defaultStyles.highlightColor,
        },
        contactItem: {
            padding: 12,
            color: 'white',
        },
    });

    const contactItems = ['email', 'phone', 'country', 'city'];

    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <Title>
                    {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
                </Title>
            </View>
            <View style={styles.container}>
                <H1>{resumeData.personalDetails.jobTitle}</H1>
            </View>
            <View style={styles.container}>
                <Text>{resumeData.summary}</Text>
            </View>

            <View style={styles.contact}>
                {contactItems.map((item) => {
                    if (
                        resumeData.personalDetails[item] &&
                        resumeData.personalDetails[item].length > 0
                    )
                        return (
                            <Text style={styles.contactItem} key={item}>
                                {resumeData.personalDetails[item]}
                            </Text>
                        );
                })}
            </View>
        </View>
    );
};

export default Header;

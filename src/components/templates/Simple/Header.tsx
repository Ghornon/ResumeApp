import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeType } from '../../../types/Resume.types';
import Title from '../_components/Title';
import getDefaultStyleSheet from '../getDefaultStyleSheet';
import H1 from '../_components/H1';

import FontAwesomeIcon from '../_components/FontAwesomeIcon';
import {
    faEnvelope,
    faPhone,
    faEarthEurope,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

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
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            lineHeight: 1,
        },
        contactItemText: {
            paddingLeft: 6,
        },
    });

    const contactItems = ['email', 'phone', 'country', 'city'];

    const getIcon = (item: string) => {
        if (item == 'email') return <FontAwesomeIcon faIcon={faEnvelope} />;
        if (item == 'phone') return <FontAwesomeIcon faIcon={faPhone} />;
        if (item == 'country') return <FontAwesomeIcon faIcon={faEarthEurope} />;
        if (item == 'city') return <FontAwesomeIcon faIcon={faLocationDot} />;

        return <FontAwesomeIcon faIcon={faLocationDot} />;
    };

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
                            <View style={styles.contactItem} key={item}>
                                {getIcon(item)}
                                <Text style={styles.contactItemText}>
                                    {resumeData.personalDetails[item]}
                                </Text>
                            </View>
                        );
                })}
            </View>
        </View>
    );
};

export default Header;

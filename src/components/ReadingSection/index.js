import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFontSize } from '../../context/FontSizeContext';

const ReadingSection = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { fontSizes } = useFontSize();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderPassages = (passages) => {
    if (!passages) return null;

    return passages.map((passage, idx) => (
      <View key={idx} style={styles.passageContainer}>
        <Text style={[styles.passageRef, { fontSize: fontSizes.subtitle }]}>
          {passage.bookTranslation} {passage.ref}
        </Text>
        {passage.verses?.map((verse) => (
          <View key={verse.id} style={styles.verseContainer}>
            <Text style={[styles.verseNumber, { fontSize: fontSizes.body }]}>
              {verse.number}
            </Text>
            <Text style={[styles.verseText, { fontSize: fontSizes.body }]}>
              {verse.text}
            </Text>
          </View>
        ))}
      </View>
    ));
  };

  const renderReading = (reading, index) => (
    <View key={index} style={styles.readingContainer}>
      {reading.introduction && (
        <Text style={[styles.introduction, { fontSize: fontSizes.body }]}>
          {reading.introduction}
        </Text>
      )}

      {reading.passages && renderPassages(reading.passages)}

      {reading.html && (
        <View style={styles.htmlContainer}>
          <Text style={[styles.htmlText, { fontSize: fontSizes.body }]}>
            {reading.title}
          </Text>
        </View>
      )}

      {reading.conclusion && (
        <Text style={[styles.conclusion, { fontSize: fontSizes.body }]}>
          {reading.conclusion}
        </Text>
      )}
    </View>
  );

  const renderSubSection = (subSection, idx) => (
    <View key={idx} style={styles.subSectionContainer}>
      {subSection.title && (
        <Text style={[styles.subSectionTitle, { fontSize: fontSizes.title }]}>
          {subSection.title}
        </Text>
      )}
      {subSection.introduction && (
        <Text style={[styles.subIntroduction, { fontSize: fontSizes.body }]}>
          {subSection.introduction}
        </Text>
      )}
      {subSection.readings?.map((reading, readingIdx) =>
        renderReading(reading, readingIdx)
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, isExpanded && styles.headerExpanded]}
        onPress={toggleExpand}
        activeOpacity={0.7}>
        <Text style={[styles.title, { fontSize: fontSizes.heading }]}>
          {section.title}
        </Text>
        <Text style={[styles.icon, { fontSize: fontSizes.heading }]}>
          {isExpanded ? '×' : '+'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          {section.subSections?.map((subSection, idx) =>
            renderSubSection(subSection, idx)
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    backgroundColor: '#4C2710',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerExpanded: {
    backgroundColor: '#B8875A',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    backgroundColor: '#FFF8F0',
    padding: 16,
  },
  subSectionContainer: {
    marginBottom: 20,
  },
  subSectionTitle: {
    color: '#4C2710',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subIntroduction: {
    color: '#6B4423',
    marginBottom: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    lineHeight: 24,
  },
  readingContainer: {
    marginBottom: 16,
  },
  introduction: {
    color: '#6B4423',
    marginBottom: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    lineHeight: 24,
  },
  passageContainer: {
    marginBottom: 16,
  },
  passageRef: {
    color: '#B8875A',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
  verseNumber: {
    color: '#B8875A',
    fontWeight: 'bold',
    marginLeft: 8,
    minWidth: 30,
  },
  verseText: {
    color: '#4C2710',
    flex: 1,
    lineHeight: 28,
  },
  htmlContainer: {
    marginVertical: 8,
  },
  htmlText: {
    color: '#4C2710',
    lineHeight: 24,
  },
  conclusion: {
    color: '#6B4423',
    marginTop: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

export default ReadingSection;

// src/components/ResumePDF.jsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from '@react-pdf/renderer';

const s = StyleSheet.create({
  page: { 
    padding: 40, 
    backgroundColor: '#fff',
    fontFamily: 'Helvetica', // Built-in, reliable, no 404
    fontSize: 11 
  },
  header: { marginBottom: 20, alignItems: 'center' },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#1e40af' },
  contact: { fontSize: 10, color: '#555', marginTop: 4 },
  section: { marginTop: 20 },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    borderBottomWidth: 1,
    borderColor: '#1e40af',
    paddingBottom: 2,
    marginBottom: 8,
  },
  text: { fontSize: 11, lineHeight: 1.5, color: '#333' },
  bullet: { fontSize: 10, marginLeft: 12, marginBottom: 4 },
  flex: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBar: { height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, marginTop: 3 },
  skillFill: (w) => ({ width: `${w}%`, height: '100%', backgroundColor: '#3b82f6' }),
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  jobTitle: { fontSize: 12, fontWeight: 'bold' },
  jobDate: { fontSize: 10, color: '#666' },
  company: { fontSize: 11, color: '#555', marginBottom: 4 },
});

export const ResumePDF = ({ resumeData }) => {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* HEADER */}
        <View style={s.header}>
          {resumeData.personal.picture && (
            <Image src={resumeData.personal.picture} style={s.avatar} />
          )}
          <Text style={s.name}>{resumeData.personal.name || 'Your Name'}</Text>
          <View style={s.flex}>
            {resumeData.personal.email && <Text style={s.contact}>{resumeData.personal.email}</Text>}
            {resumeData.personal.phone && <Text style={s.contact}> • {resumeData.personal.phone}</Text>}
            {resumeData.personal.address && <Text style={s.contact}> • {resumeData.personal.address}</Text>}
          </View>
        </View>

        {/* SUMMARY */}
        {resumeData.summary && (
          <View style={s.section}>
            <Text style={s.title}>Professional Summary</Text>
            <Text style={s.text}>{resumeData.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View style={s.section}>
            <Text style={s.title}>Work Experience</Text>
            {resumeData.experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <View style={s.jobHeader}>
                  <Text style={s.jobTitle}>{exp.jobTitle}</Text>
                  <Text style={s.jobDate}>{exp.duration}</Text>
                </View>
                <Text style={s.company}>{exp.company}</Text>
                <Text style={s.bullet}>• {exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {resumeData.education && resumeData.education.length > 0 && (
          <View style={s.section}>
            <Text style={s.title}>Education</Text>
            {resumeData.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{edu.degree}</Text>
                <Text style={{ fontSize: 11, color: '#555' }}>{edu.school}</Text>
                <Text style={{ fontSize: 10, color: '#666' }}>{edu.year}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View style={s.section}>
            <Text style={s.title}>Skills</Text>
            {resumeData.skills.map((sk, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 11 }}>{sk.name}</Text>
                  <Text style={{ fontSize: 10, color: '#666' }}>{sk.level}%</Text>
                </View>
                <View style={s.skillBar}>
                  <View style={s.skillFill(sk.level)} />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <View style={s.section}>
            <Text style={s.title}>Projects</Text>
            {resumeData.projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{proj.title}</Text>
                  {proj.link && (
                    <Link src={proj.link} style={{ fontSize: 10, color: '#3b82f6' }}>
                      View
                    </Link>
                  )}
                </View>
                <Text style={s.text}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <View style={s.section}>
            <Text style={s.title}>Certifications</Text>
            {resumeData.certifications.map((cert, i) => (
              <View key={i} style={{ flexDirection: 'row', marginBottom: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{cert.name}</Text>
                <Text style={{ fontSize: 10, color: '#666' }}>
                  {' • '} {cert.issuer} • {cert.year}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
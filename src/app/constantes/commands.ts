export default {
    CREATE_ISSUE: 'git checkout -b ${issue}',
    SELECT_ISSUE: 'git checkout ${issue}',
    APPEND_ISSUE_REFERENCE: 'echo @${path}/issues/${issue}.sql -- Murilo Vicente ${date} - ${issue} >> migracao.txt',
    APPEND_SLASH: 'echo / >> migracao.txt',
    CREATE_ISSUE_FILE: 'type NUL > ${issue}.sql',
    OPEN_ISSUE: 'start ${issue}.sql'
};

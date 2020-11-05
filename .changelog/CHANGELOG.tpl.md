{{- /* <!-- markdownlint-disable --><!-- spellchecker:ignore markdownlint --> */ -}}

{{- define "format-commit" -}}
* {{ if .Scope }}{{ .Type }}/**{{ .Scope }}**: {{ .Subject }}{{ else }}{{ .Header }}{{ end }} &ac; [`{{ .Hash.Short }}`]({{ commitURL .Hash.Long }})
{{ end -}}

{{- define "format-commit-group" }}
#### {{ .Title }}

{{ range .Commits }}{{ template "format-commit" . -}}{{ end -}}
{{ end -}}

<!-- markdownlint-disable heading-increment no-duplicate-heading no-inline-html -->
<!-- spellchecker:ignore () CICD Deno EditorConfig chglog gitattributes maint markdownlint rivy typeof -->

# CHANGELOG <br/> [{{ $.Info.Title }}]({{ $.Info.RepositoryURL }})
{{ if .Unreleased.CommitGroups }}{{/* <a name="unreleased"></a> */}}
## [Unreleased]
{{ range .Unreleased.CommitGroups }}{{ template "format-commit-group" . }}{{ end -}}
{{ end -}}

{{ range .Versions }}
---
{{ $output := false -}}
{{/* <a name="{{ .Tag.Name }}"></a> */}}
## {{ if .Tag.Previous }}[{{ .Tag.Name }}]({{ $.Info.RepositoryURL }}/compare/{{ .Tag.Previous.Name }}...{{ .Tag.Name }}){{ else }}{{ .Tag.Name }}{{ end }} <small>({{ datetime "2006-01-02" .Tag.Date }})</small>
{{ if .CommitGroups -}}
{{ range .CommitGroups }}{{ if eq .Title "Enhancements" }}{{ $output = true }}{{ template "format-commit-group" . }}{{- end -}}{{- end -}}
{{ range .CommitGroups }}{{ if eq .Title "Changes" }}{{ $output = true }}{{ template "format-commit-group" . }}{{- end -}}{{- end -}}
{{ range .CommitGroups }}{{ if eq .Title "Fixes" }}{{ $output = true }}{{ template "format-commit-group" . }}{{- end -}}{{- end -}}
{{ range .CommitGroups }}{{ if not (eq .Title "Changes" "Enhancements" "Fixes") }}{{ $output = true }}{{ template "format-commit-group" . }}{{- end -}}{{- end -}}
{{- end -}}

{{ if .RevertCommits }}{{ $output = true }}
#### Reverts

{{ range .RevertCommits -}}
* {{ .Revert.Header }}
{{ end }}
{{ end -}}

{{ if .MergeCommits -}}
#### Pull Requests

{{ range .MergeCommits -}}
* {{ .Header }}
{{ end }}
{{ end -}}

{{ if .NoteGroups -}}
{{ range .NoteGroups -}}
#### {{ .Title }}

{{ range .Notes }}
{{ .Body }}
{{ end }}
{{ end -}}
{{ end -}}

{{- if not $output }}
*No changelog for this release.*
{{ end -}}
{{- end -}}

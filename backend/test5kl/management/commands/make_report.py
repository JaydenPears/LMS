import xlsxwriter
from django.core.management import BaseCommand

from test5kl.models import Answer


class Command(BaseCommand):
    help = 'Make excel report'
    def handle(self, *args, **options):
        report = xlsxwriter.Workbook('Результаты.xlsx')

        worksheet = report.add_worksheet()
        data = dict()
        for ans in Answer.objects.all():
            fio = ans.fio
            answer = ans.answer.split(';')
            data[fio] = []
            for task in answer:
                task = task.split('|')
                data[fio].append([task[0], task[1] + '/' + task[2]])
        for row, (fio, answers) in enumerate(data.items()):
            worksheet.write(row, 0, fio)
            for i in range(len(answers)):
                print(answers[1])
                if answers[i][0] == '1':
                    correct_format = report.add_format({'bg_color': 'green'})
                    worksheet.write(row, i + 1, answers[i][1], correct_format)
                else:
                    wrong_format = report.add_format({'bg_color': 'red'})
                    worksheet.write(row, i + 1, answers[i][1], wrong_format)
        report.close()


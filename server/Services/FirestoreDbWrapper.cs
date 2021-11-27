using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace Liszt.Services
{
    public class FirestoreDbWrapper : IFirestoreDb
    {
        private FirestoreDb _instance;
        public FirestoreDbWrapper(string projectId = null, Google.Cloud.Firestore.V1.FirestoreClient client = null)
        {
            _instance = FirestoreDb.Create(projectId, client);
        }
        public CollectionReference Collection(string path) => _instance.Collection(path);
        public Query CollectionGroup(string collectionId) => _instance.CollectionGroup(collectionId);
        public DocumentReference Document(string path) => _instance.Document(path);
        public Task<IList<DocumentSnapshot>> GetAllSnapshotsAsync(
            IEnumerable<DocumentReference> documents,
            FieldMask fieldMask,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return _instance.GetAllSnapshotsAsync(documents, fieldMask, cancellationToken);
        }
        public Task<IList<DocumentSnapshot>> GetAllSnapshotsAsync(
            IEnumerable<DocumentReference> documents,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return _instance.GetAllSnapshotsAsync(documents, cancellationToken);
        }
        public IAsyncEnumerable<CollectionReference> ListRootCollectionsAsync() => _instance.ListRootCollectionsAsync();
        public Task RunTransactionAsync(
            Func<Transaction, Task> callback,
            TransactionOptions options = null,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return _instance.RunTransactionAsync(callback, options, cancellationToken);
        }
        public Task<T> RunTransactionAsync<T>(
            Func<Transaction, Task<T>> callback,
            TransactionOptions options = null,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return _instance.RunTransactionAsync<T>(callback, options, cancellationToken);
        }
        public WriteBatch StartBatch() => _instance.StartBatch();
        public FirestoreDb WithWarningLogger(Action<string> warningLogger) => _instance.WithWarningLogger(warningLogger);
    }
}